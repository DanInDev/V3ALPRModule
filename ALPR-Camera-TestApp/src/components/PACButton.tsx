import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet, TextInput } from 'react-native';
import { ParkingAreaPosition, ParkingArea } from '../location/locationInterfaces';
import { findClosestPA } from '../location/findClosestPA';
import { getGeolocation } from "../location/getGeoLocation";

// Interface to define all locations and a callback function for other 
interface PACButtonProps {
    locations: ParkingAreaPosition[];
    onLocationSelect: (selectedLocation: ParkingArea) => void;
}

const PACButton: React.FC<PACButtonProps> = ({ locations, onLocationSelect }) => {
    // State variables
    const [closestLocations, setClosestLocations] = useState<{ ParkingArea: ParkingArea; distance: string }[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<ParkingArea | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    // Function to handle getting current location
    const handleGetCurrentLocation = async () => {
        try {
            const geoLocation = await getGeolocation();
            const closest = findClosestPA(geoLocation, locations,3).map(location => ({
                ParkingArea: { name: location.ParkingArea.name, PAC: location.ParkingArea.PAC },
                distance: location.distance
            }));
            setClosestLocations(closest);
            setModalVisible(true);
        } catch (error) {
            console.error("Error getting current location:", error);
        }
    };

    // Function to handle selecting a location from the modal
    const handleSelectLocation = (location: { ParkingArea: ParkingArea; distance: string }) => {
        setSelectedLocation(location.ParkingArea);
        onLocationSelect(location.ParkingArea); // Callback to parent component
        setModalVisible(false); // Close the modal after selecting a location
    };

    // Function to filter locations based on search text
    const searchLocations = (query: string): ParkingAreaPosition[] => {
        // Convert query to lowercase for case-insensitive search
        const lowercaseQuery = query.toLowerCase().trim();
        
        // Filter the locations array based on the query
        const searchResults = locations.filter(location => {
            // Convert parking area name and PAC to lowercase for comparison
            const lowercaseName = location.ParkingArea.name.toLowerCase();
            const lowercasePAC = location.ParkingArea.PAC.toLowerCase();
            
            // Check if either name or PAC contains the query
            return lowercaseName.includes(lowercaseQuery) || lowercasePAC.includes(lowercaseQuery);
        });

        return searchResults;
    };

    // Function to handle search text change
    const handleSearchTextChange = (text: string) => {
        setSearchText(text);
        const searchResults = searchLocations(text);
        setClosestLocations(searchResults.map(location => ({
            ParkingArea: { name: location.ParkingArea.name, PAC: location.ParkingArea.PAC },
            distance: '0', // Dummy distance, as it's not relevant for search results
        })));
    };

    return (
        <View>
            {/* PAC button positioned in the bottom right corner */}
            <TouchableOpacity onPress={handleGetCurrentLocation} style={styles.PAC_button}>
                <Text style={styles.buttonText}>PAC</Text>
            </TouchableOpacity>
            

            {/* Main modal to display closest locations */}
            <Modal
                visible={modalVisible}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)} // Close modal on back button press
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.searchInput}
                            onChangeText={handleSearchTextChange}
                            value={searchText}
                            placeholder="Search..."
                        />
                        {/* List of closest locations */}
                        <FlatList
                            data={closestLocations}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => handleSelectLocation(item)} style={styles.locationItem}>
                                    <Text>Name: {item.ParkingArea.name}</Text>
                                    <Text>PAC: {item.ParkingArea.PAC}</Text>
                                    <Text>Distance: {item.distance}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </Modal>

            {/* Display selected location */}
            {selectedLocation && (
                <View style={styles.selectedLocationContainer}>
                    <Text style={styles.selectedLocationText}>Selected Location:</Text>
                    <Text>Name: {selectedLocation.name}</Text>
                    <Text>PAC: {selectedLocation.PAC}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({


    PAC_button: {
        backgroundColor: 'lightgrey',
        borderRadius: 30,
        width: 90,
        height: 50,
        left: 320,
        bottom: -450,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        
    },
    
    buttonText: {
        color: '#FFFFFF',
        fontFamily: 'helvetica',
        fontSize: 25,
    },
    modalContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '60%',
        backgroundColor: 'grey',
        borderRadius: 10,
        padding: 20,
        maxHeight: '70%',
    },
    locationItem: {
        padding: 10,
        marginVertical: 5,
        backgroundColor: 'dimgray',
        borderRadius: 5,
    },
    selectedLocationContainer: {
        position: 'absolute',
        bottom: -80,
        left: 10,
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 25,
    },
    selectedLocationText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    searchInput: {
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
});

export default PACButton;
