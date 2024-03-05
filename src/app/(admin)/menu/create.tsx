import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Colors from '@/src/constants/Colors';
import { useState } from 'react';
import {View,Text, StyleSheet, TextInput,Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('')
    const [image, setImage] = useState<string | null>(null);

    const resetFields = () => {
        setName('');
        setPrice('');
    };


    const validateInputs = () => {
        setError('');
        if(!name) {
            setError('Name is required');
            return false;
        }
        if(!price) {
            setError('Price is required');
            return false;
        }
        if(isNaN(parseFloat(price))){
            setError('Price must be a number');
            return false;
        }
        return true;
    };

    const onCreate = () => {
        if(!validateInputs()){
            return;
        }

        console.warn('Create',name,price);
        // save in database

        resetFields();
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{title: 'Create Product'}} />
            <Image source={{uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput value={name} 
            onChangeText={setName} 
            placeholder='Name' style={styles.input} />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput value={price} 
            onChangeText={setPrice}
            placeholder='9.99' style={styles.input} 
            keyboardType="numeric" />
            <Text style={{color:'red'}}>{error}</Text>
            <Button onPress={onCreate} text='Create' />
        </View>
    );
}

export default CreateProductScreen;

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       padding: 10,
    },
    image:{
        width: '50%',
        aspectRatio:1,
        alignSelf: 'center',
    },
    title: {
        
    },
    price: {  
        },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label:{
        color: 'grey',
        fontSize: 16,
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
        
});
