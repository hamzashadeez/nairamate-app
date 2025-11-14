import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <View style={{paddingVertical: 10, paddingHorizontal: 20, backgroundColor: 'white', borderBlockColor: 'whitesmoke', borderBottomWidth: 1, marginBottom: 10}}>
      <Logo />
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})