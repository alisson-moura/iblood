import React from 'react'
import { StyleSheet, Text } from 'react-native'

import * as theme from '../theme';

export default function Typography(props) {
    const {
        // font size
        h1,
        h2,
        h3,
        title,
        body,
        caption,
        small,
        size,

        // font weigth
        bold,
        semibold,
        ligth,

        // positions
        center,
        right,

        // colors
        color,
        accent,
        primary,
        secondary,
        tertiary,
        black,
        white,
        gray,
        gray2,
        style,
        children,
    } = props;

    const textStyles = [
        styles.text,
        h1 && styles.h1,
        h2 && styles.h2,
        h3 && styles.h3,
        title && styles.title,
        body && styles.body,
        caption && styles.caption,
        small && styles.small,
        size && { fontSize: size, },
        bold && styles.bold,
        semibold && styles.semibold,
        ligth && styles.ligth,
        center && styles.center,
        right && styles.right,
        color && styles[color], // predfined styles colors
        color && !styles[color] && { color: color, }, //custom font color

        // font color shortcurt
        accent && styles.accent,
        primary && styles.primary,
        secondary && styles.secondary,
        tertiary && styles.tertiary,
        black && styles.black,
        white && styles.white,
        gray && styles.gray,
        gray2 && styles.gray2,

        style, //rewrite predefined styles
    ];

    return <Text style={textStyles}>{children}</Text>;
}

const styles = StyleSheet.create({
    //default style
    text: {
        fontSize: theme.sizes.font,
        color: theme.colors.black,
        fontFamily: "Montserrat_400Regular",
    },

    // variations
    bold: {
        fontFamily: "Montserrat_700Bold",
    },
    semibold: {
        fontFamily: "Montserrat_500Medium",
    },
    ligth: {
        fontFamily: "Montserrat_200ExtraLight",
    },

    //positon
    center: { textAlign: "center" },
    right: { textAlign: "right" },

    //colors
    accent: { color: theme.colors.accent },
    primary: { color: theme.colors.primary },
    secondary: { color: theme.colors.secondary },
    tertiary: { color: theme.colors.tertiary },
    black: { color: theme.colors.black },
    white: { color: theme.colors.white },
    gray: { color: theme.colors.gray },
    gray2: { color: theme.colors.gray2 },

    //fonts
    h1: theme.fonts.h1,
    h2: theme.fonts.h2,
    h3: theme.fonts.h3,
    title: theme.fonts.title,
    body: theme.fonts.body,
    caption: theme.fonts.caption,
    small: theme.fonts.small,
});
