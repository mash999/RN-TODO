import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View  } from 'react-native';
import { priorityFormatter } from '../helpers';
import Card from './Card';
import colors from '../colors';
import { ListItemComponentProps } from '../types';


const formatDescription = (description: string|null) => {
    if(!description) return;
    if(description.length > 90) {
        return description.substring(0, 90) + '... ';
    }
    return description;
}


const ListItem = (props: ListItemComponentProps) => {
    const priority = priorityFormatter(props.task.priority);
    return (
        <Card>
            <TouchableOpacity onPress={() => props.onPress(props.task)}>
                <Text style={styles.headerText}>{props.task.title}</Text>
                <Text style={styles.bodyText}>{formatDescription(props.task.description)}</Text>
                <View style={styles.priorityContainer}>
                    <Text style={styles.priorityText}>Priority:</Text>
                    <Text style={{'color': priority?.color || colors.bodyText}}>
                        {priority?.text}
                    </Text>
                </View>
            </TouchableOpacity>
        </Card>
    );
}


const styles = StyleSheet.create({
    bodyText: {
        color: colors.bodyText,
        fontSize: 15,
        lineHeight: 20
    },
    headerText: {
        color: colors.headerText,
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5
    },
    priorityContainer: {
        flexDirection: 'row',
        marginTop: 8
    },
    priorityText: {
        fontWeight: '500',
        marginRight: 5
    }
})

export default ListItem;