import { NlpManager } from "node-nlp";
import stringSimilarity from "string-similarity";
import User from "../models/User.js";
import ChattingHistory from "../models/chattingHistory.js";

const SIMILARITY_THRESHOLD = 0.6;

export const handleChatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // Retrieve user information using email

    // Initialize NLP manager
    const manager = new NlpManager({ languages: ["en"] });

    // Train the NLP manager with your intents
    trainNlpManager(manager);

    // Process the user's message
    const response = await manager.process("en", message);
    if (response.intent === "EnterContactInformation") {
      const email = response.entities.email;
      const phoneNumber = response.entities.phoneNumber;

      return res.json({
        response:
          "Thank you for providing your contact information. Our agent will reach out to you soon.",
      });
    }
    // Finding the similarities among previous messages
    const similarIntent = findMostSimilarIntent(
      response.intent,
      manager.getIntentDomain()
    );

    // Construct a personalized response based on the most similar intent and user data
    const personalizedResponse = generatePersonalizedResponse(similarIntent);

    res.json({ response: personalizedResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to find the most similar intent based on string similarity
const findMostSimilarIntent = (userIntent, availableIntents) => {
  const intents = availableIntents.map((intent) => intent.name);
  const matches = stringSimilarity.findBestMatch(userIntent, intents);

  if (matches.bestMatch.rating >= SIMILARITY_THRESHOLD) {
    return matches.bestMatch.target;
  } else {
    return "Unknown"; // Default intent for low similarity
  }
};
export const handleContactRoute = async (req, res) => {
  try {
    const { email, phoneNumber, message } = req.body;

    // Create a new document in the ChattingHistory collection with the user details and the chat message
    await ChattingHistory.create({ email, phoneNumber, message });

    res.json({
      success: true,
      message: "Contact information and chat history stored successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to generate a personalized response based on intent and user data
const generatePersonalizedResponse = (intent, user) => {
  switch (intent) {
    case "Greeting":
      return `Hi ${user.username}! This is Raddaf, your real estate buddy. How may I help you today?`;

    case "IdentifyRole":
      return `Hi ${user.username}, are you looking to buy, sell, or rent a property, or are you a tenant experiencing issues with your property?`;

    case "BuyerSellerOptions":
      return `Hi ${user.username}, here are some options for you:
        - Issue in Sale
        - Rent/Letted Property
        - Letting Property
        - Issue with website
        - Profile Issues
        - Call Agent`;

    case "TenantOptions":
      return `Hi ${user.username}, here are some ways I can help:
        - Agreement Issues
        - Repairs
        - Billing Issues
        - Call Agent`;

    case "IssueInSale":
      return "Can you provide more details on why you want to revert the listing request?";

    case "RentLettedProperty":
      return "Is the issue related to a property you currently own or want to rent out?";

    case "LetLettingProperty":
      return "Sure, can you tell me more about the property you want to let?";

    case "WebsiteProfileIssue":
      return "Certainly! Can you describe the issue you're experiencing with the website or your profile?";

    case "AgreementIssue":
      return "What specific part of the agreement are you concerned about?";

    case "Repairs":
      return "Got it! What type of repair is needed?";

    case "BillingIssue":
      return "Sure, can you explain the billing concern you have?";

    case "SendFeedback":
      return "To send feedback, please provide your contact information and details. Our relevant agent (Landlord/Zone Agent) will contact you.";

    case "End":
      return "Your feedback has been sent, and an agent will contact you soon. Have a great day!";

    case "Unknown":
      return "I didn't quite get that. Can you please rephrase or specify your request?";

    default:
      return "I did not understand that. Can you please rephrase or specify your request?";
  }
};

// Function to train the NLP manager with your intents
const trainNlpManager = (manager) => {
  // Greeting
  manager.addDocument("en", "Hi", "Greeting..This Raddaf buddy.");
  manager.addDocument("en", "Hello", "Greeting..This Raddaf buddy.");
  manager.addDocument("en", "Hey", "Greeting..This Raddaf buddy.");
  manager.addDocument("en", "Greetings", "Greeting..This Raddaf buddy.");
  manager.addDocument("en", " ", "Greeting..This Raddaf buddy.");

  // IdentifyRole
  manager.addDocument(
    "en",
    "Are you looking to buy, sell, or rent a property?",
    "IdentifyRole"
  );
  manager.addDocument(
    "en",
    "Do you want to buy, sell, or rent a property?",
    "IdentifyRole"
  );
  manager.addDocument(
    "en",
    "Are you a tenant with property issues?",
    "IdentifyRole"
  );

  // BuyerSellerOptions
  manager.addDocument("en", "Tell me my options", "BuyerSellerOptions");
  manager.addDocument("en", "What can I do?", "BuyerSellerOptions");
  manager.addDocument("en", "Options for me", "BuyerSellerOptions");

  // TenantOptions
  manager.addDocument("en", "How can you help tenants?", "TenantOptions");
  manager.addDocument("en", "What services for tenants?", "TenantOptions");
  manager.addDocument("en", "Assistance for tenants", "TenantOptions");

  // Add more training data for other intents

  manager.train();
};
