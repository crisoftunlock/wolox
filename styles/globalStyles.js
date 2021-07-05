import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    paddingHorizontal: width * 0.10 - 24,
    paddingTop: height * 0.10 - 59
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 10
  },
  inputBox: {
    marginTop: 10,
  },

  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
})
