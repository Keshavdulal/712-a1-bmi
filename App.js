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
  const [userBmiCategory, setUserBmiCategory] = useState('');
  const [userHeight, setUserHeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const [isMetric, setMetric] = useState(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    if (userHeight && userWeight) {
      // bmi formulla = weight (kg) / height (m)^2
      const userBMI = isMetric
        ? (userWeight / userHeight / userHeight) * 703
        : (userWeight / userHeight / userHeight) * 100 * 100;

      setUserBmi(userBMI.toFixed(2));

      switch (true) {
        case userBMI < 16:
          setUserBmiCategory('Underweight (Severe thinness)');
          break;

        case userBMI >= 16 && userBMI <= 16.9:
          setUserBmiCategory('Underweight (Moderate thinness)');
          break;

        case userBMI >= 17 && userBMI <= 18.4:
          setUserBmiCategory('Underweight (Mild thinness)');
          break;

        case userBMI >= 18.5 && userBMI <= 24.9:
          setUserBmiCategory('Normal range');
          break;

        case userBMI >= 25 && userBMI <= 29.9:
          setUserBmiCategory('Overweight (Pre-Obese)');
          break;

        case userBMI >= 30 && userBMI <= 34.9:
          setUserBmiCategory('Obese (Class I)');
          break;

        case userBMI >= 35 && userBMI <= 39.9:
          setUserBmiCategory('Obese (Class II)');
          break;

        case userBMI >= 40:
          setUserBmiCategory('Obese (Class III)');
          break;
      }
    }
  }, [userHeight, userWeight, isMetric]);

  const handleWeightInput = newWeight => setUserWeight(newWeight);
  const handleHeightInput = newHeight => setUserHeight(newHeight);

  const clearInputs = () => {
    setUserHeight(0);
    setUserWeight(0);
    setUserBmi(0);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.appWrapper}>
        {/* Unit System - Switch */}
        <Text>Unit System</Text>
        <View style={styles.unitButtonsWrapper}>
          <Button
            style={styles.button}
            title="SI"
            onPress={() => setMetric(false)}
            color={!isMetric ? '#2196F3' : '#ddd'}
          />
          <Button
            onPress={() => setMetric(true)}
            style={styles.button}
            title="Metric"
            color={isMetric ? '#2196F3' : '#ddd'}
          />
        </View>

        {/* INPUTS */}
        <Text>Height ({isMetric ? 'in' : 'cm'})</Text>
        <TextInput
          keyboardType="numeric"
          styles={styles.textInput}
          value={userHeight}
          onChangeText={handleHeightInput}
          underlineColorAndroid="#222"
        />
        <Text>Weight ({isMetric ? 'lb' : 'kg'})</Text>
        <TextInput
          keyboardType="numeric"
          styles={styles.textInput}
          value={userWeight}
          onChangeText={handleWeightInput}
          underlineColorAndroid="#222"
        />

        {/* OUTPUT */}
        <Text>BMI:{userBmi}</Text>
        <Text>Your BMI Category:{userBmiCategory}</Text>

        <Button onPress={clearInputs} title="Clear Inputs" />

        {/* BMI Classes */}

        <Text>BMI Categories</Text>
        <Text>⩽ 16.0 Underweight (Severe thinness)</Text>
        <Text>16.0 – 16.9 Underweight (Moderate thinness)</Text>
        <Text>17.0 – 18.4 Underweight (Mild thinness) </Text>
        <Text>18.5 – 24.9 Normal range</Text>
        <Text>25.0 – 29.9 Overweight (Pre-obese)</Text>
        <Text>30.0 – 34.9 Obese (Class I)</Text>
        <Text>35.0 – 39.9 Obese (Class II)</Text>
        <Text>⩾ 40.0 Obese (Class III)</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    // height: 40,
    // margin: 12,
    borderWidth: 10,
    borderColor: '#000',
    borderBottomColor: '#000',
    backgroundColor: '#000',
  },
});

export default App;
