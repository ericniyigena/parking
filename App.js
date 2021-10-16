import React, { Component } from "react";
import * as Font from 'expo-font';
import AppLoading from "expo-app-loading";
import { Asset } from 'expo-asset';
import Routes from "./src/routes";

const customFonts  = {
  Black: require('./src/assets/fonts/Poppins-Black.ttf'),
  Bold: require('./src/assets/fonts/Poppins-Bold.ttf'),
  Thin: require('./src/assets/fonts/Poppins-Thin.ttf'),
  Light: require('./src/assets/fonts/Poppins-Light.ttf'),
  Medium: require('./src/assets/fonts/Poppins-Medium.ttf'),
  Regular: require('./src/assets/fonts/Poppins-Regular.ttf'),
  SemiBold: require('./src/assets/fonts/Poppins-SemiBold.ttf'),
  ExtraBold: require('./src/assets/fonts/Poppins-ExtraBold.ttf'),
  ExtraLight: require('./src/assets/fonts/Poppins-ExtraLight.ttf'),
};


function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}


class AppContainer extends Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./src/assets/images/worker.png')
    ]);

    await Font.loadAsync(customFonts)

    await Promise.all([...imageAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <Routes/>
  }
}

export default AppContainer
