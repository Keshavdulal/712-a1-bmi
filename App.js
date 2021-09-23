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
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import * as palette from './palette'; // color palette

const categories = [
  '⩽ 16.0 Underweight (Severe thinness)',
  '16.0 – 16.9 Underweight (Moderate thinness)',
  '17.0 – 18.4 Underweight (Mild thinness)',
  '18.5 – 24.9 Normal range<',
  '25.0 – 29.9 Overweight (Pre-obese)',
  '30.0 – 34.9 Obese (Class I)',
  '35.0 – 39.9 Obese (Class II)',
  '⩾ 40.0 Obese (Class III)',
];

const App = () => {
  // Application states
  const [userBmi, setUserBmi] = useState(0);
  const [userBmiCategory, setUserBmiCategory] = useState('Category Unknown');
  const [userHeight, setUserHeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const [isMetric, setMetric] = useState(false);

  useEffect(() => {
    if (userHeight && userWeight) {
      // switch between systems using ternary operator
      // bmi = weight (kg) / height (m)^2
      const userBMI = isMetric
        ? (userWeight / userHeight / userHeight) * 703 // Imperial (lb, in)
        : (userWeight / userHeight / userHeight) * 100 * 100; // SI (kg, cm)

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
    <SafeAreaView style={styles.root}>
      <View style={styles.appWrapper}>
        {/* Unit System - Switcher */}
        <View style={styles.switchSection}>
          <Text style={styles.title}>BMI Calculator</Text>
          <View style={styles.buttonGroup}>
            <View style={!isMetric ? styles.buttonActive : styles.button}>
              <Button
                title="SI"
                onPress={() => setMetric(false)}
                color={
                  !isMetric
                    ? palette.primaryColorText
                    : palette.primaryColorDark
                }
              />
            </View>

            <View style={isMetric ? styles.buttonActive : styles.button}>
              <Button
                onPress={() => setMetric(true)}
                title="Metric"
                color={
                  isMetric ? palette.primaryColorText : palette.primaryColorDark
                }
              />
            </View>
          </View>
        </View>

        {/* INPUTS */}
        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>
            Height ({isMetric ? 'in' : 'cm'})
          </Text>
          <TextInput
            keyboardType="numeric"
            styles={styles.textInput}
            value={userHeight}
            onChangeText={handleHeightInput}
            underlineColorAndroid="#222"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>
            Weight ({isMetric ? 'lb' : 'kg'})
          </Text>
          <TextInput
            keyboardType="numeric"
            styles={styles.textInput}
            value={userWeight}
            onChangeText={handleWeightInput}
            underlineColorAndroid="#222"
          />
        </View>

        <View style={styles.clearButton}>
          <Button
            onPress={clearInputs}
            title="Clear"
            color={palette.primaryColorText}
          />
        </View>

        {/* OUTPUT */}
        <View style={styles.outputSection}>
          <Text style={styles.title}>{userBmi}</Text>
          <Text style={styles.title}>{userBmiCategory}</Text>
        </View>

        {/* BMI Classes */}
        {/* <Text style={styles.subTitle}>BMI Categories</Text> */}
        <View style={styles.divider} />
        <FlatList
          style={styles.indexList}
          keyExtractor={i => i}
          data={categories}
          renderItem={i => <Text style={styles.indexItem}>{i?.item}</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.primaryColor,
  },
  appWrapper: {
    padding: 20,
  },

  switchSection: {
    alignContent: 'center',
  },
  title: {
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
    color: palette.primaryColorLight,
  },
  subTitle: {
    textTransform: 'uppercase',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
  },
  buttonGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonWrapper: {
    borderWidth: 1,
    borderColor: '#000',
  },
  button: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: palette.dividerColor,
    borderColor: palette.dividerColor,
    // borderColor: palette.primaryColorDark,
  },
  buttonActive: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: palette.accentColor,
    borderColor: palette.accentColor,
    // borderColor: palette.primaryColorDark,
  },
  clearButton: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: palette.primaryColorLight,
  },
  inputWrapper: {
    // flexDirection: 'row',
    padding: 10,
    marginTop: 10,
    backgroundColor: palette.primaryColorLight,
  },
  inputLabel: {
    color: palette.primaryColorDark,
  },
  textInput: {
    backgroundColor: palette.accentColor,
  },

  outputSection: {
    marginTop: 10,
  },
  divider: {
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: palette.dividerColor,
  },

  indexList: {
    marginTop: 10,
  },
  indexItem: {
    color: palette.primaryColorLight,
  },
});

export default App;
