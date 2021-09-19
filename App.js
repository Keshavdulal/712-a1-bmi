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
      const userBMI = isMetric
        ? (userWeight / userHeight / userHeight) * 703
        : (userWeight / userHeight / userHeight) * 100 * 100;

      setUserBmi(userBMI.toFixed(2));
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

        <Button onPress={clearInputs} title="Clear Inputs" />
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
