import React from 'react'
import { StyleSheet, View } from 'react-native'

import * as theme from '../theme';

export default function Block(props) {
    const {
        flex,
        style,
        row,
        column,
        center,
        middle,
        card,
        shadow,
        color,
        space,
        children
    } = props;

    const blockStyles = [
        styles.block,
        flex && { flex },
        flex === false && { flex: 0 }, // reset / disable flex
        row && styles.row,
        column && styles.column,
        center && styles.center,
        middle && styles.middle,
        space && { justifyContent: `space-${space}` },
        card && styles.card,
        shadow && styles.shadow,
        color && styles[color], // predfined styles colors for backgroundColor
        color && !styles[color] && { backgroundColor: color }, //custom backgroundColor
        style, //rewrite predefined styles
    ];

    return (
        <View style={blockStyles}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    column: {
        flexDirection: 'column'
    },
    card: {
        borderRadius: theme.sizes.border
    },
    center: {
        alignItems: 'center'
    },
    middle: {
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: theme.colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    accent: {
        backgroundColor: theme.colors.accent
    },
    primary: {
        backgroundColor: theme.colors.primary
    },
    secondary: {
        backgroundColor: theme.colors.secondary
    },
    tertiary: {
        backgroundColor: theme.colors.tertiary
    },
    black: {
        backgroundColor: theme.colors.black
    },
    white: {
        backgroundColor: theme.colors.white
    },
    gray: {
        backgroundColor: theme.colors.gray
    },
    gray2: {
        backgroundColor: theme.colors.gray2
    },
})
