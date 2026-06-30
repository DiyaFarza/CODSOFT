# Simple Rule-Based Chatbot
# This chatbot uses if-else statements and basic pattern matching
# to understand user input and respond appropriately.

import random

def get_response(user_input):
    user_input = user_input.lower().strip()  # convert to lowercase, remove extra spaces

    # Greetings
    if any(word in user_input for word in ["hello", "hi", "hey"]):
        return "Hello! How can I help you today?"

    # Asking how the bot is
    elif "how are you" in user_input:
        return "I'm just a program, but I'm doing great! Thanks for asking."

    # Asking the bot's name
    elif "your name" in user_input:
        return "I'm a simple rule-based chatbot created for an AI internship task."

    # Asking what the bot can do
    elif "what can you do" in user_input or "help" in user_input:
        return "I can chat with you about simple topics like greetings, my name, the time, and more!"

    # Asking about the weather
    elif "weather" in user_input:
        return "I can't check live weather yet, but I hope it's nice outside!"

    # Thanks
    elif "thank" in user_input:
        return random.choice(["You're welcome!", "No problem!", "Glad I could help!"])

    # Goodbye
    elif any(word in user_input for word in ["bye", "goodbye", "see you"]):
        return "Goodbye! Have a great day!"

    # Fallback response for anything not understood
    else:
        return "I'm sorry, I didn't understand that. Could you rephrase?"


def main():
    print("Chatbot: Hi! I'm a rule-based chatbot. Type 'bye' to exit.")

    while True:
        user_input = input("You: ")

        if user_input.lower().strip() in ["bye", "goodbye", "exit", "quit"]:
            print("Chatbot: Goodbye! Have a great day!")
            break

        response = get_response(user_input)
        print("Chatbot:", response)


if __name__ == "__main__":
    main()