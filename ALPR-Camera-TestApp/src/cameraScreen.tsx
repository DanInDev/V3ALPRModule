import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import RNFS from 'react-native-fs';

import { ALPRCamera, FilterOptions, addFilterToMap } from "@alprapp/v2alpr-camera";

import PACButton from './components/PACButton';
import { locations } from "../tests/locations/testLocations";

const swedishFilter: FilterOptions = {
    minLength: 5,
    maxLength: 7,
    pattern: /^[A-Z]{3}[0-9]{3}$/i,
    name: "Swedish",
}
addFilterToMap("Swedish", swedishFilter );

const App: React.FC = () => {
    const [selectedPAC, setSelectedPAC] = useState<string>('');
    const [ocrResult, setOCRResult] = useState<string | null>(null);
    const [callResult, setCallResult] = useState<string | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [cameraActive, setCameraActive] = useState<boolean>(true);
    const [torchActive, setTorchActive] = useState< "on" | "off">("off");



    // Callback function to handle location selection
    const handleLocationSelect = (selectedLocation: { name: string; PAC: string }) => {
        console.log("HandleLocationSelect is setting to : " + selectedLocation.PAC)
        setSelectedPAC(selectedLocation.PAC);
        console.log('The selected pac is: ' + selectedPAC)
    };

    // Callback function to handle OCR result update
    const handleOCRResultUpdate = (result: string | null) => {
        setOCRResult(result);
    };

    // Callback function to handle call result update
    const handleCallResultUpdate = (result: string | null) => {
        setCallResult(result);
    };

    // Helper function to save the blob to the file system
    const saveBlobToFile = async (blob: Blob): Promise<string> => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
            reader.onloadend = async () => {
                const base64data = reader.result;
                if (typeof base64data === 'string') {
                    const path = `${RNFS.DocumentDirectoryPath}/photo.jpg`;
                    try {
                        await RNFS.writeFile(path, base64data.split(',')[1], 'base64');
                        resolve(`file://${path}`);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(new Error("Failed to convert blob to base64 string"));
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    // Callback function to handle image blob update
    const handleImageTaken = async (blob: Blob | null) => {
        if (blob) {
            try {
                const imageUrl = await saveBlobToFile(blob);
                setImageUri(imageUrl);
                console.log("Image URI: ", imageUrl);
            } catch (error) {
                console.error("Error saving blob to file: ", error);
            }
        }
    };

    function handleRemoveImage(): void {
        setImageUri(null);
        console.log("Image removed");
    }

    function handleTurnOnOffCamera(): void {
        if (cameraActive) {
            setCameraActive(false);
        } else { setCameraActive(true); }
    }

    function handleTurnOnOffTorch(): void {
        if (torchActive === "on") {
            setTorchActive("off");
        } else { setTorchActive("on"); }
    }

    return (
        <>
            {/* ALPR Camera component */}
            <ALPRCamera
                OnPlateRecognized={handleOCRResultUpdate}
                OnCallLimitReached={handleCallResultUpdate}
                callLimit={3}
                OnPictureTaken={handleImageTaken}

                isActive={cameraActive}

                torch={torchActive}

                takePictureButtonStyle={bottom_bar.takePictureButton}
                takePictureButtonTextStyle={bottom_bar.takePictureButtonText}
                takePictureButtonText="Take Picture"

                filterOption="GENERAL"
            >

                <PACButton locations={locations} onLocationSelect={handleLocationSelect} />

                <View style={left_bar.container}>
                    <View style={left_bar.sideNav}>
                        <View style={left_bar.navItem}>
                            <Text style={left_bar.text}>
                                Current License Plate: <Text style={left_bar.licensePlate}>{ocrResult}</Text>
                            </Text>
                        </View>
                        <View style={left_bar.navItem}>
                            <Text style={left_bar.text}>
                                Last Called: <Text style={left_bar.licensePlate}>{callResult}</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity onPress={handleTurnOnOffCamera}>
                    <View style={bottom_bar.turnOnOffCamera}>
                        <Text style={bottom_bar.takePictureButtonText}>Toggle Camera</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleTurnOnOffTorch}>
                    <View style={bottom_bar.turnOnOffTorch}>
                        <Text style={bottom_bar.takePictureButtonText}>Toggle Torch</Text>
                    </View>
                </TouchableOpacity>
            </ALPRCamera>
            {imageUri && (
                <View style={image.imageContainer}>
                    <Image source={{ uri: imageUri }} style={image.image} />
                    <TouchableOpacity style={image.remove_button} onPress={handleRemoveImage}>
                        <Text style={image.remove_button_text}>X</Text>
                    </TouchableOpacity>
                </View>
            )}
        </>
    );
};

const bottom_bar = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    turnOnOffCamera: {
        backgroundColor: '#018B51',
        borderRadius: 30,
        width: 90,
        height: 80,
        left: 1,
        bottom: -80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    turnOnOffTorch: {
        backgroundColor: '#018B51',
        borderRadius: 30,
        width: 90,
        height: 80,
        left: 1,
        bottom: -80,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    takePictureButton: {
        backgroundColor: '##018B51',
        borderRadius: 30,
        width: 90,
        height: 80,
        left: 160,
        justifyContent: 'center',
        borderWidth: 1,
    },
    takePictureButtonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
});

const left_bar = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    sideNav: {
        width: 120,
        backgroundColor: 'transparent',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    navItem: {
        marginBottom: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'left',
        textShadowRadius: 3,
        textShadowColor: 'darkgreen',
    },
    licensePlate: {
        fontWeight: 'bold',
        color: 'green',
        backgroundColor: 'lightgrey',
        padding: 5,
        borderRadius: 5,
    },
});

const image = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10,
    },
    remove_button: {
        backgroundColor: 'darkred',
        width: 35,
        height: 35,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowRadius: 3,
    },
    remove_button_text: {
        color: 'white',
        fontSize: 14,
        textShadowColor: 'black',
        textShadowRadius: 3,
    }
});

export default App;
