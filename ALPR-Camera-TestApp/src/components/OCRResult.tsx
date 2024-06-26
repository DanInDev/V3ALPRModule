import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the OCR status enum
export enum OCRStatus {
  Valid = 'Valid',
  Processing = 'Processing',
  Invalid = 'Invalid',
  Warning = 'Warning',
}

interface OCRResultProps {
    status: OCRStatus; // Use the OCR status enum instead of string literals
    result: string;
}

const OCRResult: React.FC<OCRResultProps> = ({ status, result }) => {
    let backgroundColor = '#CCCCCC'; // Default background color for Processing

    switch (status) {
        case OCRStatus.Valid:
            backgroundColor = '#018B51'; // Green for Valid (note the corrected color code)
            break;
        case OCRStatus.Warning:
            backgroundColor = '#8B8000'; // Yellow for Warning
            break;
        case OCRStatus.Invalid:
            backgroundColor = '#FF0000'; // Red for Invalid
            break;
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.text, { backgroundColor }]}>{result}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        width: '65%',
        height: '15%',
    },
    text: {
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 10,
        fontFamily: 'helvetica',
        fontStyle: 'normal',
        fontSize: 35,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default OCRResult;
