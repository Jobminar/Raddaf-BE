import { NlpManager } from "node-nlp";
import ChattingHistory from "../models/chattingHistory.js";

const GENERIC_GREETING =
  "Hi! This is Raddaf, your real estate buddy. How may I help you today?";
const SIMILARITY_THRESHOLD = 0.6;
const initializeNlpManager = () => {
  const manager = new NlpManager({ languages: ["en"] });
  trainNlpManager(manager);
  return manager;
};
export const handleChatbotMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message || message.trim() === "") {
      return res.json({ response: "Please provide a valid message." });
    }

    // Initialize NLP manager
    const manager = initializeNlpManager();

    // Process the user's message
    const response = await manager.process("en", message);

    console.log("Intent:", response.intent); // Add this line for debugging

    const personalizedResponse = generatePersonalizedResponse(response.intent);

    console.log("Personalized Response:", personalizedResponse); // Add this line for debugging

    return res.json({ response: personalizedResponse || GENERIC_GREETING });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
const generatePersonalizedResponse = (intent) => {
  switch (intent) {
    case "Sell":
      return "What kind of property do you want to sell, commercial or residential?";
    case "Tolet":
      return "What kind of property do you want to sell, commercial or residential?";

    case "Yes":
      return `Certainly! Here are some options:
        - Report an Issue with Sale
        - Explore Renting or Letting a Property
        - Property Management
        - Resolve Website or Profile Issues
        - Connect with our Agent`;
    case "Hi ":
    case " ":
    case "Greeting":
    case "GreetingOptions":
      return [
        {
          text: "Report an Issue with Sale",
          value: "Report an Issue with Sale",
          actionType: "sendMessage",
        },
        {
          text: "Explore Renting or Letting a Property",
          value: "Explore Renting or Letting a Property",
          actionType: "sendMessage",
        },
        {
          text: "Property Management",
          value: "Property Management",
          actionType: "sendMessage",
        },
        {
          text: "Resolve Website or Profile Issues",
          value: "Resolve Website or Profile Issues",
          actionType: "sendMessage",
        },
        {
          text: "Connect with our Agent",
          value: "Connect with our Agent",
          actionType: "sendMessage",
        },
      ];

    case "IdentifyRole":
      return `Greetings! Are you looking to buy, sell, or rent a property, or perhaps you're a tenant facing issues with your current property? Let me know so I can guide you accordingly.`;
    case "BuyerSellerOptions":
      return `Hello! If you're interested in buying or selling, here are some options for you:
        - Report an Issue with Sale
        - Explore Renting or Letting a Property
        - Property Management
        - Resolve Website or Profile Issues
        - Connect with our Agent`;
    case "TenantOptions":
      return `Hi there! If you're a tenant, here are some ways I can assist you:
        - Address Agreement Issues
        - Handle Repairs
        - Resolve Billing Issues
        - Connect with our Agent`;
    case "IssueInSale":
      return "Certainly! To assist you better, could you provide more details on why you want to revert the listing request for your property?";
    case "RentLettedProperty":
      return "Sure thing! Is the issue related to a property you currently own or one you want to rent out? Provide more details so I can guide you appropriately.";
    case "LetLettingProperty":
      return "Absolutely! To get started, please share more information about the property you're interested in letting, such as location, type, and any specific requirements.";
    case "WebsiteProfileIssue":
      return "Of course! I'm here to help. Could you please describe in detail the issue you're experiencing with the website or your profile?";
    case "AgreementIssue":
      return "Understood. To better assist you, could you specify which part of the agreement is causing concern? This will help me provide more accurate guidance.";
    case "Repairs":
      return "Got it! Understanding the type of repair needed is crucial. Could you please provide more details about the specific repair or issue you're facing?";
    case "BillingIssue":
      return "Certainly! To address the billing concern effectively, please explain the details of the issue you're experiencing. This will help us resolve it promptly.";
    case "SendFeedback":
      return "We value your feedback! To send feedback, please provide your contact information and additional details. Our dedicated agent (Landlord/Zone Agent) will reach out to you.";
    case "End":
      return "Thank you for your feedback! Your input has been received, and our agent will be in touch with you soon. Have a wonderful day!";
    case "Unknown":
      return "I didn't quite catch that. Could you please rephrase or provide more details about your request? Your clarification will help me assist you more effectively.";
    default:
      return "I'm sorry, I didn't understand that. Can you please rephrase or provide more information? Your input is crucial for me to assist you better.";
  }
};

// Function to train the NLP manager with your intents
// Function to train the NLP manager with your intents
const trainNlpManager = (manager) => {
  manager.addDocument("en", "sell", "Sell");

  // Add variations and potential questions related to selling
  manager.addDocument("en", "I want to sell my property", "Sell");
  manager.addDocument("en", "sell my house", "Sell");
  manager.addDocument("en", "sell commercial property", "Sell");
  manager.addDocument("en", "how can I sell my house", "Sell");

  // Add more training data for other intents
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

  // Additional training data for more intents
  manager.addDocument("en", "I have a problem with my listing", "IssueInSale");
  manager.addDocument(
    "en",
    "I want to rent out my property",
    "LetLettingProperty"
  );
  manager.addDocument(
    "en",
    "I need help with website issues",
    "WebsiteProfileIssue"
  );

  // Additional variations and validations
  manager.addDocument(
    "en",
    "I need assistance with selling my property",
    "BuyerSellerOptions"
  );
  manager.addDocument(
    "en",
    "Tell me about renting out my house",
    "LetLettingProperty"
  );
  manager.addDocument(
    "en",
    "I'm having trouble with my profile",
    "WebsiteProfileIssue"
  );

  // Train the manager
  manager.train();
};
