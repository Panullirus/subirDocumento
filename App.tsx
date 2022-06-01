import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View } from 'react-native';
import Amplify, { Storage } from 'aws-amplify'
import awsconfig from './src/aws-exports'
Amplify.configure(awsconfig)
import * as DocumentPicker from 'expo-document-picker';

export default function App() {

   type DocumentFile = "pdf" | "jpeg" | "png";
   type pickFileFn = () => Promise<string>;
   type uploadFn = (fileType: DocumentFile, uri: string) => Promise<string>;

   interface SlisstoDocuments {
     pickDocument: pickFileFn
     pickImage: pickFileFn
     uploadFile: uploadFn
   }

  //  const uploadFile: uploadFn = async (fileType, uri) => {
  //    const key = fileType;
  //  }

  //  export const SlisstoDocuments: SlisstoDocuments = {
  //    uploadFile
  //  }

  async function selectDocument() {
    var archivo:any = await DocumentPicker.getDocumentAsync({})
    try {
      const response = await fetch(archivo.uri);
      const blob = await response.blob();
      await Storage.put("pdf", blob)
    }catch(err){
      console.log("Error uploading file: ", err)
    }
  }

  return (
    <View style={styles.container}>
      <Button
      title="subir documento"
      onPress={selectDocument}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
