import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import MapView from 'react-native-maps';

export default class Map extends Component {

    getInitialPosition = () => {
        const markerPositions = this.props.route.params.markers
        console.log({ pozycje: markerPositions })
        const firstPosition = JSON.parse(markerPositions[0][1])
        return firstPosition.coords
    }

    render() {
        const markerPositions = this.props.route.params.markers

        const markers = markerPositions.map(pos => {
            const position = JSON.parse(pos[1])
            return (
                <MapView.Marker
                    coordinate={{
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    }}
                    title={pos[0]}
                    key={pos[0]}
                />
            )
        })
        console.log({ markers: markers })
        const coords = this.getInitialPosition()

        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: coords.latitude,
                        longitude: coords.longitude,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003,
                    }}
                >
                    {markers}
                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    map: {
        flex: 1
    }
})
