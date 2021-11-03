import * as Location from "expo-location";
import * as Font from "expo-font";
import React, { Component } from 'react'
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import MyButton from "./MyButton";


export default class Main extends Component {

    state = {
        fontLoaded: false
    }

    navigateToList = () => {
        this.props.navigation.navigate('List')
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'montserrat': require('../assets/montserrat.ttf'),
        });
        this.setState({ fontLoaded: true })
    }

    render() {
        return (
            <>
                <View style={styles.topPanel}>
                    {
                        this.state.fontLoaded
                            ?
                            <>
                                <Text style={styles.title}> GeoMap App</Text>
                                <Text style={styles.text}>find and save your position</Text>
                            </>
                            :
                            <ActivityIndicator size="large" color="#000000" />
                    }
                </View>
                <View style={styles.bottomPanel}>
                    <MyButton title='START' onPress={this.navigateToList} />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    topPanel: {
        flex: 1,
        width: '100%',
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomPanel: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'montserrat',
        fontSize: 40
    },
    text: {
        fontFamily: 'montserrat',
        fontSize: 20
    }
})
