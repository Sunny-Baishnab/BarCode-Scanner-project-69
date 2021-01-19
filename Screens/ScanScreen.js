import * as React from 'react';
import{Text,View,StyleSheet , TouchableOpacity} from 'react-native';
import *as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }

    getCameraPermission = async()=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==='granted',
            buttonState:'clicked',
            scanned:false
        })
    }

    handleBarCodeScan = async({type , data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState==='clicked'&&hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned = {scanned?undefined:this.handleBarCodeScan} 
                style= {StyleSheet.absoluteFillObject}/>
            )
        }
        else if(buttonState==='normal'){

        
        return(
            <View style={styles.Container}>
                <Text style = {{fontSize:35 , fontWeight:'bold'}}>BAR CODE SCANNER</Text>
                <Text style = {styles.ButtonText}>
                    {hasCameraPermissions===true?this.state.scannedData:'Request Camera Permission'}
                </Text>
                <TouchableOpacity style = {styles.QR} onPress={this.getCameraPermission}>
                    <Text style = {styles.ButtonText1}>Scan QR Code</Text>
                </TouchableOpacity>
            </View>
        )
    }
    }
}

const styles = StyleSheet.create({
    Container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginTop:150
    },
    QR:{
        width:'80%',
        height:70,
        backgroundColor:'blue',
        padding:20,
        borderRadius:5,
        margin:10,
        marginTop:10
    },
    ButtonText:{
        fontSize:20,
        fontWeight:'bold',
        textDecorationLine:'underline',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    ButtonText1:{
        fontSize:20,
        fontWeight:'bold',
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center'
    }
})