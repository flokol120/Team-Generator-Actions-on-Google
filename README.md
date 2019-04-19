# Team Generator
> :star: an actions on google application which can be used to easily generate teams by just using voice commands.
___
# Used technologies
- [**Dialogflow**](https://dialogflow.com/): Easy and self explanatory ML interface
- [**Firebase functions**](https://firebase.google.com/): Use Node.JS code without worrying about servers / and additional costs
- [**Actions on Google**](https://developers.google.com/actions/): You can test and publish your Action easily
- [**TypeScript**](https://www.typescriptlang.org/)
___
# Getting started
**TL;DR?**
Those instructions are specefically meant to be very detailed to give absolute newbies a place to start. 
If you happened to have some experience with the used technologies, you will be able to skim the instructions whilst understanding most of it.
### 0. Create a Dialogflow account

  * Visit the [docs](https://dialogflow.com/docs/getting-started/create-account) if you are not sure how.
___
### 1. Create a new agent in Dialogflow

  * Visit the [docs](https://dialogflow.com/docs/getting-started/first-agent) if you are not sure how (you only need to add a new agent. You do not have to create any intents).
___
### 2. Import your agent/project into actions on google

  1. Visit the [actions on google console](https://console.actions.google.com/)
  2. Log in using your Google Account
  3. Click on the big :heavy_plus_sign: (Add/import project)
  4. You should now be able to see the project which was created by Dialogflow, just select it and choose ```create project```
  5. Choose ```Conversational``` at the very bottom
  6. Choose an invokation of your liking (i.e. mine is ```generate teams```)
___
### 3. Import the intents

  1. Click the settings symbol in the top left corner
  2. Choose ```Export and Import```
  3. Choose ```restore from zip```
  4. Drag and Drop the ```dialog-flow-intents.zip``` (or click ```select file```)
  5. Type ```RESTORE``` in the text input (It has to be upper case, I've tested it. Otherwise it wouldn't sound that cool, right? :sunglasses:) and ckick the ```restore``` button
  6. Click ```done``` after it is finished.
___
### 4. Setup Firebase functions

  1. Install the dependencies using yarn or npm
  ```
  cd functions/
  yarn
  ```
  or
  ```
  cd functions/
  npm install
  ```
  2. Visit the [Firebase console](https://console.firebase.google.com/)
  3. Log in using your Google Account
  4. Scroll down and you will find your project created in Dialogflow. Open it
  5. Click on ```Functions``` in the sidebar
  6. Click on ```get started```
  7. **Do not install firebase-tools globally even though Firebase tells you to! Just click next.**
  8. run the following using yarn
  ```
  cd functions/
  yarn run init
  ```
  or using npm

  ```
  cd functions/
  npm run init
  ```
  9. Choose ```TypeScript``` using the arrow keys and hit ```ENTER```
  10. **Hit ```ENTER``` 6 times** 
  11. type ```n``` and then ```ENTER```
  12. Click the settings icon in the top left corner inside your project
  13. Select ```project settings```
  14. Copy your ```Project-ID```
  15. Open up the .firebaserc file and replace the placeholder with your ```Project-ID```
  16. run using yarn
  ```
  cd functions/
  yarn deploy
  ```
  or using npm

  ```
  cd functions/
  npm run deploy
  ```
  **This may take a while...**
  ___
### 5. Set up fulfillment
  1. Navigate to your Functions in your Firebase Project
  2. Copy the URL in the ```Trigger``` coloumn
  3. Open you Dialogflow agent
  4. Click on ```Fulfillment``` in the sidebar
  5. Paste the copied URL in the URL Text input
  6. Scroll down and hit save
  7. Hit the settings icon
  8. Go to ```ML Settings```
  9. Hit ```train```. This will train the ML by the entered trigger words. This might take a time, depending on your system. The training process is indicated by the rolling settings icon.
  ___
That's it! You can now test the imported intents and the team dividing script by using the ```Simulator``` in the Actions on Google console!
Every time you are modifying the actual code in ```functions/src/``` you will have to deploy your changes to Firebase. To do that simply run with yarn:
```
cd functions/
yarn deploy
```
or with npm:
```
cd functions/
npm run deploy
```
### Troubleshooting
#### I cannot test the intents in the Actions on Google Simulator
  1. Wait! Actions on Google is sometimes taking its time.
  2. Repeat the ML training step in 5.8 - 5.9
  ___
**Feel free to [contact me](mailto:flokol120@gmail.co) or open an issue!**
