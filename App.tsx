import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import Routes from '~/routes';

import './global.css';

// Mantenha a splash screen visível até que os recursos estejam prontos
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    DINNextW1GBlack: require('./assets/fonts/DINNextW1G-Black.otf'),
    DINNextW1GBlackItalic: require('./assets/fonts/DINNextW1G-BlackItalic.otf'),
    DINNextW1GBold: require('./assets/fonts/DINNextW1G-Bold.otf'),
    DINNextW1GBoldItalic: require('./assets/fonts/DINNextW1G-BoldItalic.otf'),
    DINNextW1GHeavy: require('./assets/fonts/DINNextW1G-Heavy.otf'),
    DINNextW1GHeavyItalic: require('./assets/fonts/DINNextW1G-HeavyItalic.otf'),
    DINNextW1GItalic: require('./assets/fonts/DINNextW1G-Italic.otf'),
    DINNextW1GLight: require('./assets/fonts/DINNextW1G-Light.otf'),
    DINNextW1GLightItalic: require('./assets/fonts/DINNextW1G-LightItalic.otf'),
    DINNextW1GMedium: require('./assets/fonts/DINNextW1G-Medium.otf'),
    DINNextW1GMediumItalic: require('./assets/fonts/DINNextW1G-MediumItalic.otf'),
    DINNextW1GRegular: require('./assets/fonts/DINNextW1G-Regular.otf'),
    DINNextW1GUltraLight: require('./assets/fonts/DINNextW1G-UltraLight.otf'),
    DINNextW1GUltraLightItalic: require('./assets/fonts/DINNextW1G-UltraLightItalic.otf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <BottomSheetModalProvider>
        <Routes />
      </BottomSheetModalProvider>
    </View>
  );
}
