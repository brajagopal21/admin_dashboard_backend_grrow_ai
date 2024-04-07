import User from "../Models/User-model.js";

const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log(prompt);
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User Not register" });
    }
    const chats = user.chats;
    // const openai = configureOpenAi();
    // const chatResponse = await openai.completions.create({
    //   model: "gpt-3.5-turbo-instruct",
    //   prompt: prompt,
    // });
    const data = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPEN_AI_SECRET}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        prompt: prompt,
        max_tokens: 3000,
      }),
    });
    if (!data.ok) {
      throw new Error(data.statusText);
    }
    const chatResponse = await data.json();
    const newResponse = {
      prompt: prompt,
      content: chatResponse?.choices[0]?.text,
    };
    chats.push(newResponse);
    console.log(user.chats);
    await user.save();
    return res.status(200).json({
      success: true,
      chat: newResponse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error,
      message: "Something went wrong",
    });
  }
};

export default generateContent;
// const assistant = await openai.beta.assistants.create({
//   model: "gpt-3.5-turbo",
//   name: "Content writer",
//   instructions:
//     "You are a personal Content Writer. Write and run code to Write Content.",
// });
// let assistantId = assistant.id;
// console.log("Created assistant with Id: " + assistantId);

// const thread = await openai.beta.threads.create({ messages: chats });

// let threadId = thread.id;
// console.log("Created thread with Id: " + threadId);

// const chatResponse = await openai.beta.threads.runs.create(threadId, {
//   assistant_id: assistantId,
//   additional_instructions:
//     "Please address the user as Personal user. The user has a premium account.",
// });
// console.log("Run finished with status: " + chatResponse.status);

// if (chatResponse.status == "completed") {
//   const messages = await openai.beta.threads.messages.list(thread.id);
//   for (const message of messages.getPaginatedItems()) {
//     console.log(message);
//     user.chats.push(message);
//     console.log(user.chats);
//   }
// }
