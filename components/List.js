import React, { Component } from 'react'
import { Text, StyleSheet, View, Switch, FlatList, ActivityIndicator } from 'react-native'
import uuid from 'react-native-uuid';
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyButton from './MyButton'
import ListItem from './ListItem';

export default class List extends Component {

    state = {
        positions: undefined,
        saving: false,
        enabledAll: false,
        enabledMarkers: []
    }

    savePosition = async () => {
        this.setState({ saving: true })
        let pos = await Location.getCurrentPositionAsync({})
        await AsyncStorage.setItem(uuid.v4(), JSON.stringify(pos));
        await this.getPositions()
        this.setState({ saving: false })
    }

    getPositions = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let positions = await AsyncStorage.multiGet(keys);
        console.log(positions)
        this.setState({ positions })
    }

    clearPositions = async () => {
        await AsyncStorage.clear()
        this.getPositions()
    }

    navigateToMap = () => {
        const { enabledAll, enabledMarkers, positions } = this.state
        const markers = enabledAll ? positions : enabledMarkers
        if (markers.length > 0)
            this.props.navigation.navigate('Map', { markers })
    }

    toggleSwitch = () => {
        this.setState(prevState => ({
            enabledAll: !prevState.enabledAll
        }))
    }

    toggleMarker = (pos) => {
        const enabledMarkers = [...this.state.enabledMarkers]
        const index = enabledMarkers.indexOf(pos)
        if (index < 0) {
            enabledMarkers.push(pos)
        }
        else {
            enabledMarkers.splice(index, 1)
        }
        this.setState({ enabledMarkers })
    }

    async componentDidMount() {
        await Location.requestForegroundPermissionsAsync();
        this.getPositions();
    }

    render() {
        const { enabledAll } = this.state
        return (
            <View>
                <View style={styles.row}>
                    <MyButton title='Save position' onPress={this.savePosition} />
                    <MyButton title='Clear positions' onPress={this.clearPositions} />
                </View>
                <View style={styles.row}>
                    <MyButton
                        title='Show on map'
                        onPress={this.navigateToMap}
                        buttonStyle={styles.mapButton}
                    />
                    <Switch
                        style={styles.switch}
                        onValueChange={this.toggleSwitch}
                        value={enabledAll}
                    />
                </View>


                <FlatList
                    style={styles.list}
                    data={this.state.positions}
                    renderItem={pos => <ListItem data={pos.item} enabledAll={enabledAll} toggleMarker={this.toggleMarker} />}
                    keyExtractor={pos => pos[0]}
                />

                {
                    this.state.saving
                        ?
                        <ActivityIndicator
                            style={styles.loading}
                            size="large"
                            color="#000000"
                        />
                        :
                        false
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    switch: {
        marginLeft: 'auto'
    },
    list: {
        marginBottom: 80
    },
    mapButton: {
        marginLeft: 'auto',
        paddingLeft: 40
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 10,
        top: 5,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-start'
    }
})
