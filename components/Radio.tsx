import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../colors';
import { RadioComponentProps } from '../types';


const Radio = (props: RadioComponentProps) => {
    return (
        <TouchableOpacity 
            style={styles.radioBoxContainer}
            onPress={() => props.onSelect(props.value)}
        >
            { props.isSelected
                ? <Ionicons name="radio-button-on" size={24} color={colors.radioBorder} />
                : <Ionicons name="radio-button-off" size={24} color={colors.radioBorder} />
            }
            <Text style={styles.radioOptionLabel}>{props.title}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    radioBoxContainer: {
        flexDirection: 'row',
        marginVertical: 3
    },
    radioOptionLabel: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 2,
        color: colors.bodyText
    }
});


export default Radio;