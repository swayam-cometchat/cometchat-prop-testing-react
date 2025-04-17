# 📦 CometChat UI Kit Cypress Automation

This project contains automated Cypress tests for verifying various props and behaviors of the `CometChatConversations` component.

---

## 📁 Project Structure

```
.
├── public/
├── src/
│   └── cypress/
│       └── e2e/
│           └── cometchat_conversations.cy.js
│   └── components/
│       └── testConversations.tsx
├── package.json
├── vite.config.js
├── ...
```

---

## 🚀 Getting Started

### ✅ Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later recommended)
- npm

---

## 🧩 Run the Component App

The UI runs on Vite dev server.

```bash
npm install
npm run dev
```

This will start the application on [http://localhost:5173](http://localhost:5173)

---

## 🧪 Run Cypress Tests

To open Cypress Test Runner:

```bash
cd src
npx cypress open
```

This will launch the Cypress UI where you can run test cases such as:
- Hide/show user status
- Hide/show group type
- Receipt visibility
- Delete option availability
- Selection mode (multiple, single, none)

> **Note:** Make sure the dev server is running (`npm run dev`) before running Cypress tests.

---

## ⚙️ Test Parameters

The component accepts query parameters to toggle prop behavior:

| Prop | Description | Example |
|------|-------------|---------|
| `hideUserStatus` | Hide status indicator for users | `?hideUserStatus=true` |
| `hideGroupType` | Hide group type subtitle | `?hideGroupType=true` |
| `hideReceipts` | Hide delivery/read receipts | `?hideReceipts=true` |
| `hideDeleteConversation` | Hide the delete option in conversation list | `?hideDeleteConversation=true` |
| `selectionMode` | Conversation selection mode (`single`, `multiple`, `none`) | `?selectionMode=multiple` |

---

## 🛠 Example Cypress Test

```js
it('should hide receipts when hideReceipts=true', () => {
  cy.visit('http://localhost:5173?hideReceipts=true');
  cy.get('.cometchat-receipts').should('not.exist');
});
```

---

## 📌 Tips

- Always run the app using `npm run dev` before testing.
- Use `cy.wait(ms)` sparingly to allow UI animations to complete.
- Modify `baseUrl` in the test file if your local server runs on a different port.

---

## 📮 Feedback

For bugs, improvements, or enhancements, feel free to open an issue or contribute to the project.
---

## 🚀 Creator: Swayam

