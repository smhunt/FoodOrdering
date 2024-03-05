import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import { useState } from 'react';
import {View,Text, StyleSheet, TextInput,Image} from 'react-native';

const CreateProductScreen = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

const[error, setError] = useState('')

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

    return (
        <View style={styles.container}>
            <Image source={{uri: defaultPizzaImage }} style={styles.image} />

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
    }
});
