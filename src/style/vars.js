let gray = {
    white: 'rgb(255, 255, 255)',
    light_A4: 'rgb(244, 244, 244)',
    light_A3: 'rgb(233, 233, 233)',
    light_A2: 'rgb(222, 222, 222)',
    light_A1: 'rgb(211, 211, 211)',
    light_A0: 'rgb(200, 200, 200)',
    twilight: 'rgb(170, 170, 170)',
    medium: 'rgb(128, 128, 128)',
    dark: 'rgb(85, 85, 85)',
    midnight: 'rgb(40, 40, 40)',
    black: 'rgb(0, 0, 0)',
};

let color = {
    primary: '#0000FE',
    accent: '#F2994A',
    success: '#4ABA69',
    danger: '#EF5858',
    caution: '#F2994A',
    info: '#2D9CDB',
    neutral: '#808080',
};

let space = {
    tiny_1: 2,
    tiny_2: 4,
    tiny_3: 6,
    tiny_4: 8,
    small_1: 10,
    small_2: 12,
    small_3: 14,
    small_4: 16,
    medium_1: 20,
    medium_2: 24,
    medium_3: 28,
    medium_4: 32,
    large_1: 40,
    large_2: 48,
    large_3: 56,
    large_4: 64,
    huge_1: 80,
    huge_2: 96,
    huge_3: 112,
    huge_4: 128,
};

let border_radius = {
    level_1: 3,
    level_2: 4,
};

let box_shadow = {
    level_1: '0px 1px 4px rgba(0, 0, 0, 0.15)',
    level_2: '0px 3px 12px rgba(0, 0, 0, 0.15)',
    level_3: '0px 9px 36px rgba(0, 0, 0, 0.15)',
};

let z_index = {
    layout_portal: 1100,
    dropdown: 1200,
    tooltip: 1300,
    toast: 1400,
};

let duration = {
    transition_normal: '200ms',
    transition_heavy: '400ms',
};

let dimension = {
    input_standard_height: 32,
    input_standard_padding: 8,
    date_picker_cell: 30,
};

let line_height = {
    h1: 1.5,
    h2: 1.5,
    h3: 1.5,
    h4: 1.5,
    body: 1.6,
    body_bold: 1.6,
    body_semibold: 1.6,
    body_small: 1.6,
    button: 1.6,
    button_small: 1.4,
    button_large: 1.8,
    code: 1.4,
};

let font_size = {
    h1: 30,
    h2: 24,
    h3: 20,
    h4: 18,
    body: 16,
    body_bold: 16,
    body_semibold: 16,
    body_small: 15,
    button: 16,
    button_small: 14,
    button_large: 18,
    code: 16,
};

let font_weight = {
    h1: 600,
    h2: 600,
    h3: 600,
    h4: 600,
    body: 400,
    body_bold: 700,
    body_semibold: 600,
    body_small: 400,
    button: 400,
    button_small: 400,
    button_large: 400,
    code: 400,
};

let font_family = {
    h1: 'inherit',
    h2: 'inherit',
    h3: 'inherit',
    h4: 'inherit',
    body: 'inherit',
    body_bold: 'inherit',
    body_semibold: 'inherit',
    body_small: 'inherit',
    button: 'inherit',
    button_small: 'inherit',
    button_large: 'inherit',
    code: 'monospace',
};

let text_color = {
    default: gray.midnight,
};

let action_color = {
    primary: color.primary,
    primary_disabled: gray.light_A2,
    negative: color.danger,
    negative_disabled: gray.light_A2,
    neutral: color.neutral,
    neutral_disabled: gray.light_A2,
};

let input_color = {
    default: gray.dark,
    hovered: gray.dark,
    focused: gray.dark,
    disabled: gray.medium,
};

let input_background = {
    default: gray.white,
    hovered: gray.white,
    focused: gray.white,
    disabled: gray.light_A4,
};

let input_border_color = {
    default: gray.light_A2,
    hovered: color.primary,
    focused: color.primary,
    disabled: gray.light_A2,
};

let input_placeholder_color = {
    default: gray.twilight,
    hovered: gray.twilight,
    focused: gray.light_A2,
    disabled: gray.twilight,
};

let input_box_shadow = {
    default: 'none',
    hovered: 'none',
    focused: 'none',
    disabled: 'none',
};

let $color_interactive = {
    color_hover: 'fade(@color, 80%)',
    color_active: 'fade(@color, 60%)',
    background_hover: 'darken(@color, 4%)',
    background_active: 'darken(@color, 8%)',
    background_tinged_hover: `hardlight(@color, ${gray.light_A4})`,
    background_tinged_active: `hardlight(@color, ${gray.light_A3})`,
};

module.exports = {
    gray,
    color,
    space,
    border_radius,
    box_shadow,
    duration,
    z_index,
    dimension,
    line_height,
    font_size,
    font_weight,
    font_family,
    text_color,
    action_color,
    input_color,
    input_background,
    input_border_color,
    input_placeholder_color,
    input_box_shadow,
    $color_interactive,
};
