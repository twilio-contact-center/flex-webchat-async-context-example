import React from 'react';
import * as FlexWebChat from "@twilio/flex-webchat-ui";

class App extends React.Component {

  state = {};

  constructor(props) {
    super(props);

    const { configuration } = props;

    FlexWebChat.Manager.create(configuration)
      .then(manager => this.setState({ manager }))
      .catch(error => this.setState({ error }));
    
    /** 
     * Wait 5 seconds, then set the `customerInformation` state object. This
     * will cause the component to re-render
     */
    setTimeout(() => {
      this.setState({
        customerInformation: {
          customerId: 1,
          firstName: "Timothy",
          lastName: "Banks",
          email: "tbanks@gmail.com",
          landingUrl: "https://www.wayfair.com"
        }
      })
    }, 5000);

  }

  render() {
    const { manager, error } = this.state;
    if (error) {
      console.error("Failed to initialize Flex Web Chat", error);
    }
    /**
     * If we haven't retrieved/set the customerInformation state object yet,
     * return an empty div. Otherwise, render FlexWebChat
     */
    if (manager && this.state.customerInformation) {
      /**
       * Set context variables for forwarding into our new Chat Channel's
       * attributes (once it gets instantiated)
       */
      manager.store.getState().flex.config.context.customerId = this.state.customerInformation.customerId;
      manager.store.getState().flex.config.context.firstName = this.state.customerInformation.firstName;
      manager.store.getState().flex.config.context.lastName = this.state.customerInformation.lastName;
      manager.store.getState().flex.config.context.email = this.state.customerInformation.email;
      manager.store.getState().flex.config.context.landingUrl = this.state.customerInformation.landingUrl;

      return (
        <FlexWebChat.ContextProvider manager={manager}>
          <FlexWebChat.RootContainer />
        </FlexWebChat.ContextProvider>
      );
    } else {
      return <div></div>
    }
    
  }
}

export default App;
