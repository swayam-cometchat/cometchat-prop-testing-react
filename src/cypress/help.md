# How to do the conditional rendering of react components

### Step 1
create a component ----> chat component

Chat ---> 1. MessageHeader
          2. MessageList
          3. MessageComposer

### Render it when?
when you select a chat 

### Logic to render?
create a state variable in parent component when a chat is selected 
Type -> (User || Group || Conversation)

basically when variable is not null 

then RENDER the component -> Chat Component ( give it prop -> selectedChat)


### Parent component should look like this
    Conversation Container -> Div 
    Chat Container -> Div (when selectedChat is null then it'll show static text ( "no chat i selected" )) when chat is selected it'll render the Chat Component
