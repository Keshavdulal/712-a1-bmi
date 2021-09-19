/**
 * BMI App
 * Assignment 1 - Enteprise Tech - Przemyslaw Pawluk
 * Author - Keshav Dulal
 */

import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [userBmi, setUserBmi] = useState(0);
  const [userHeight, setUserHeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const [isMetric, setMetric] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (userHeight && userWeight) {
      // bmi formulla = weight (kg) / height (m)^2
      const heightInMeter = userHeight / 100;
      const userBMI = userWeight / (heightInMeter * heightInMeter);

      setUserBmi(userBMI.toFixed(2));
    }
  }, [userHeight, userWeight]);

  const handleWeightInput = newWeight => setUserWeight(newWeight);
  const handleHeightInput = newHeight => setUserHeight(newHeight);

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.appWrapper}>
        {/* INPUTS */}
        <Text>Height ({isMetric ? 'in' : 'cm'})</Text>
        <TextInput
          keyboardType="numeric"
          styles={styles.textInput}
          value={userHeight}
          onChangeText={handleHeightInput}
          placeholde="Your Height"
        />
        <Text>Weight ({isMetric ? 'lb' : 'kg'})</Text>
        <TextInput
          keyboardType="numeric"
          styles={styles.textInput}
          value={userWeight}
          onChangeText={handleWeightInput}
          placeholde="Your Weight"
        />

        {/* OUTPUT */}
        <Text>BMI:{userBmi}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {},
  appWrapper: {
    padding: 20,
  },
  unitButtonsWrapper: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  // button: {},
  // buttonActive: {},
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 10,
    borderColor: '#000',
    borderBottomColor: '#000',
    backgroundColor: '#000',
  },
});

export default App;
