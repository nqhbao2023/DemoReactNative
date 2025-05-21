import { StyleSheet, Text, View, TouchableOpacity, Vibration, experimental_LayoutConformance } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Calcutator = () => {
  const buttonLeft = [
    ['C', 'DEL',],
    ['7', '8', '9',],
    ['4', '5', '6', ],
    ['1', '2', '3', ],
    ['0','.']
  ]
  const buttonRight = [
    ["/","*","-","+","="]
  ]

  const [theme, setTheme] = useState('light');
  const [saveTemp, setSaveTemp] = useState('')
  const [ketqua, setKetqua] = useState('')

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) setTheme(savedTheme);
    }
    loadTheme()
  }, [])

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    await AsyncStorage.setItem('theme', newTheme)
  }

  const isDark = theme === 'dark'

  const clickButton = (btn) => {
    if (['+', '-', '*', '/', '=', 'C', 'DEL'].includes(btn)) {
      Vibration.vibrate(50)
    }

    if (btn === 'C') {
      setSaveTemp('')
    } else if (btn === 'DEL') {
      setSaveTemp(saveTemp.slice(0, -1))
    } else if (btn === '=') {
      try {
        const result = eval(saveTemp)
        setKetqua(result.toString()) 
        setSaveTemp('')
      } catch (error) {
        setKetqua('Error') 
      }
    } else {
      setSaveTemp(saveTemp + btn)
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#263238' : '#f2f2f3' }]}>
      <View style={styles.top}>
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={isDark ? "sunny" : "moon"}
            size={28}
            color={isDark ? "#fff" : "#000"}
            style={{ padding: 10 }}
          />
        </TouchableOpacity>
  
        <View style={styles.resultContainer}>
          <Text style={[styles.saveTemp, { color: isDark ? '#fff' : '#000' }]}>
            {saveTemp || '0'}
          </Text>
          <Text style={[styles.result, { color: '#00BCD4' }]}>
            {ketqua || '0'}
          </Text>
        </View>
      </View>
  
      <View style={[styles.bottom, { backgroundColor: isDark ? '#37474F' : '#fff' }]}>
        <View style={styles.mainButtonContainer}>
          {/* Left buttons */}
          <View style={styles.leftButtons}>
            {buttonLeft.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((btn, btnIndex) => {
                  const isOperator = ['C', 'DEL'].includes(btn)
                  return (
                    <TouchableOpacity
                      key={btnIndex}
                      onPress={() => clickButton(btn)}
                      style={[
                        styles.button,
                        {
backgroundColor: isOperator ? '#00BCD4' : (isDark ? '#455A64' : '#fff'),
                          flex: btn === '0' ? 2 : 1,
                          marginRight: 5 // Thêm khoảng cách ngang
                        }
                      ]}
                    >
                      <Text style={[
                        styles.buttonText,
                        { color: isOperator ? '#fff' : isDark ? '#fff' : '#333' }
                      ]}>
                        {btn}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            ))}
          </View>
          
          {/* Right buttons */}
          <View style={styles.rightButtons}>
            {buttonRight[0].map((btn, index) => {
              const isOperator = ['/', '*', '-', '+', '='].includes(btn)
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => clickButton(btn)}
                  style={[
                    styles.rightButton,
                    {
                      backgroundColor: isOperator ? '#00BCD4' : (isDark ? '#455A64' : '#fff'),
                      marginBottom: 5 // Thêm khoảng cách dọc
                    }
                  ]}
                >
                  <Text style={[
                    styles.buttonText,
                    { color: isOperator ? '#fff' : isDark ? '#fff' : '#333' }
                  ]}>
                    {btn}
                  </Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red' 
  },
  top: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 10,
    position: 'relative',
  },
  resultContainer: {
    position: 'absolute', 
    bottom: 10, 
    width: '100%',
    alignItems: 'flex-end',
  },
  result: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  bottom: {
    flex: 2,
    width: '100%',
    padding: 10,
    backgroundColor: 'red' 
  },
  mainButtonContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftButtons: {
    flex: 3,
  },
  rightButtons: {
    flex: 1,
    marginLeft: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5, 
  },
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70, // Chiều cao cố định
  },
  rightButton: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 70, // Chiều cao bằng với bên trái
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  saveTemp: {
    fontSize: 30,
    marginBottom: 10,
  }
})

export default Calcutator;