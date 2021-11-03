import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types';

export default class MyButton extends Component {
    render() {
        const { title, onPress, buttonStyle, textStyle } = this.props
        return (
            <TouchableOpacity
                style={{ ...buttonStyle, ...styles.button }}
                onPress={onPress}
            >
                <Text style={{ ...textStyle, ...styles.text }}>
                    {title}
                </Text>
            </TouchableOpacity>
        )
    }
}

MyButton.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        padding: 5,
    },
    text: {
        alignSelf: 'center',
        fontSize: 17
    }
})
