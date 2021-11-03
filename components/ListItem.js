import React, { Component } from 'react'
import { Text, StyleSheet, View, Switch, Image } from 'react-native'

export default class ListItem extends Component {

    state = {
        enabled: false
    }

    toggleSwitch = () => {
        this.setState(prevState => ({
            enabled: !prevState.enabled
        }))
        this.props.toggleMarker(this.props.data)
    }

    render() {
        const [id, posJSON] = this.props.data
        const pos = JSON.parse(posJSON)
        return (
            <View style={styles.container}>
                <Image
                    style={styles.globeLogo}
                    source={require('../assets/globe.png')}
                />
                <View>
                    <Text> timestamp: {pos.timestamp} </Text>
                    <Text> latitude: {pos.coords.latitude} </Text>
                    <Text> longitude: {pos.coords.longitude} </Text>
                </View>

                <Switch
                    style={styles.switch}
                    onValueChange={this.toggleSwitch}
                    value={
                        this.props.enabledAll
                            ?
                            this.props.enabledAll
                            :
                            this.state.enabled
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    globeLogo: {
        width: 60,
        height: 60
    },
    switch: {
        marginLeft: 'auto'
    }
})
