import {
  filledInputClasses,
  outlinedInputClasses,
  paperClasses,
  tableCellClasses,
} from '@mui/material'
import { Check, Circle } from '@mui/icons-material'
import { red } from '@mui/material/colors'

export function createComponents(): any {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: 14,
          minHeight: 46,
          height: 46,
          borderRadius: '50px',
          color: 'var(--white-base)',
          textTransform: 'none',
          backgroundColor: 'var(--button-default-background)',
          '&:hover': {
            backgroundColor: 'var(--button-default-background-hover)',
          },
          '&.Mui-disabled': {
            backgroundColor: 'var(--button-default-background-hover)',
            color: 'var(--white-base)',
          },
          minWidth: '160px',
        },
        outlined: {
          color: 'var(--primary-color) !important',
          backgroundColor: 'var(--button-outlined-background)',
          borderColor: 'currentColor !important',
          '&:hover': {
            backgroundColor: 'var(--button-outlined-background-hover)',
            color: 'var(--white-base) !important',
          },
          '&.Mui-disabled': {
            backgroundColor: 'var(--button-default-background-hover)',
            color: 'var(--white-base) !important',
          },
        },
        textCancel: {
          color: 'var(--error-color) !important',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
            color: 'var(--error-color) !important',
          },
        },
        sizeSmall: {
          padding: '11px 16px',
          minWidth: '122px',
        },
        sizeMedium: {
          padding: '10px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 30px',
        },
        textSizeLarge: {
          padding: '12px 38px',
        },
        containedSecondary: {
          backgroundColor: 'var(--button-contained-secondary-background)',
          color: 'var(--button-contained-secondary-color)',
          borderRadius: '6px',
          '&:hover': {
            backgroundColor: 'var(--button-contained-secondary-background-hover)',
            color: 'var(--button-contained-secondary-color-hover)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          width: '100%',
          borderRadius: '5px',
          background: '#B2B2B2',
        },
        bar: {
          background: 'var(--primary-color)',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'var(--primary-color)',
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          '& .Mui-selected ': {
            backgroundColor: 'var(--primary-color) !important',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          '& .MuiTypography-root ': {
            fontSize: '12px !important',
            fontWeight: 400,
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paperAnchorDockedBottom: {
          zIndex: '1000 !important',
          minHeight: 400,
          maxHeight: '50vh',
          padding: 40,
          background: '#F6F7F8',
          width: 'calc(100vw - var(--sidebar-width)) !important',
          left: 'auto !important',
          right: '0 !important',
          borderTop: '1px solid #D9D9D9',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: 30,
          height: 30,
          borderRadius: 7,
          '& .MuiSvgIcon-root': {
            fontSize: '18px',
          },
        },
        colorPrimary: {
          background: 'var(--dark-secondary-color)',
          color: 'var(--light-text-color)',
          '&:hover': {
            background: 'var(--darker-secondary-color)',
          },
        },
        colorInfo: {
          background: 'var(--white-base)',
          color: 'var(--primary-color)',
          '&:hover': {
            background: 'var(--light-primary-color)',
          },
        },
        colorSecondary: {
          background: 'var(--dark-secondary-color)',
          color: 'var(--primary-color)',
          '&:hover': {
            background: 'var(--darker-secondary-color)',
          },
        },
        sizeSmall: {
          '& .MuiSvgIcon-root': {
            fontSize: '14px',
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 6000,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          [`&.${paperClasses.elevation1}`]: {
            boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontWeight: 700,
          minWidth: '70px',
          height: '24px',
          fontSize: '12px',
        },
        colorError: {
          backgroundColor: 'var(--chip-background-error)',
          color: 'var(--chip-color-error)',
        },
        colorSuccess: {
          backgroundColor: 'var(--chip-background-success)',
          color: 'var(--chip-color-success)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px 16px',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        color: 'var(--text-color)',
        underline: 'hover',
      },
      styleOverrides: {
        root: {
          width: 'fit-content',
          fontWeight: 700,
          fontSize: 14,
        },
        body2: {
          color: red,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          fontFamily: 'var(--main-font)',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#root': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          backgroundColor: 'var(--primary-color)',
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000,
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            color: 'var(--lightest-text-color) !important',
            fontSize: 14,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          [`legend`]: {
            width: '0',
          },
          borderColor: 'var(--input-bg-color)',
          marginTop: 5,
          '&::after': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderBottom: 'none !important',
          },
          '&:hover': {
            '&::after': {
              borderBottom: 'none !important',
            },
            '&::before': {
              borderBottom: 'none !important',
            },
          },
        },
        multiline: {
          borderRadius: '21px !important',
          minHeight: '155px !important',
        },
        input: {
          '&::placeholder': {
            fontWeight: 400,
            fontSize: '12px !important',
            color: 'var(--input-placeholder-color) !important',
          },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          '& .MuiButtonBase-root': {
            color: 'var(--lightest-text-color)',
            marginLeft: '0 !important',
          },

          '& .MuiSvgIcon-root': {
            fontSize: '19px !important',
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          '&.Mui-disabled': {
            '& .MuiAutocomplete-endAdornment': {
              display: 'none',
            },
          },
          height: 12,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '0 16px',
          display: 'flex',
          alingItems: 'center',
          '&:focus': {
            borderRadius: '50px !important',
            display: 'flex',
            alingItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&::after': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderBottom: 'none !important',
          },
          '&:hover': {
            '&::after': {
              borderBottom: 'none !important',
            },
            '&::before': {
              borderBottom: 'none !important',
            },
          },
        },
        underline: {
          '&:before': {
            borderBottom: '0px solid #D9D9D9 !important',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: '0px solid var(--light-text-color) !important',
          },
          '&.Mui-focused:after': {
            borderBottom: '0px solid var(--primary-color) !important',
          },
        },
        input: {
          fontSize: 14,
          fontWeight: 400,
          '&::placeholder': {
            color: 'var(--input-placeholder-color) !important',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          minHeight: 46,
          borderColor: 'var(--input-bg-color)',
          borderRadius: '50px !important',
          backgroundColor: 'var(--input-bg-color) !important',
          height: 46,
          '&:hover': {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--input-bg-color)',
              borderWidth: 1,
            },
          },
          [`&.${outlinedInputClasses.focused}`]: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--input-border-color-focused)',
              borderWidth: 1,
            },
          },
          [`&.${outlinedInputClasses.disabled}`]: {
            backgroundColor: 'transparent !important',
            borderWidth: '0 !important',
            padding: '0 !important',
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--input-bg-color)',
              borderWidth: 0,
              padding: '0 !important',
            },
            [`& .Mui-disabled`]: {
              opacity: '1 !important',
            },
            [`& .MuiChip-root`]: {
              '& .MuiSvgIcon-root': {
                display: 'none',
              },
            },
          },
          [`&.${filledInputClasses.error}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--error-color) !important',
            },
          },
          '& .MuiSvgIcon-root': {
            fontSize: '18px !important',
            color: 'var(--lightest-text-color)',
          },
          '& .MuiSelect-select': {
            '& .Mui-disabled': {
              padding: '0 !important',
            },
            '~ .Mui-disabled': {
              display: 'none !important',
            },
          },
        },
        input: {
          height: 12,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
        },
        multiline: {
          borderRadius: '21px !important',
          minHeight: '155px !important',
        },
        notchedOutline: {
          borderColor: 'var(--input-bg-color)',
        },
      },
    },
    MuiStandardInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'none !important',
          '&::after': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderBottom: 'none !important',
          },
        },
        input: {
          height: 12,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '0 16px',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          minHeight: 46,
          borderColor: 'var(--input-bg-color)',
          borderRadius: '50px !important',
          backgroundColor: 'rgba(0, 0, 0, 0.03) !important',
          borderBottom: 'none !important',
          height: 46,
          '&::after': {
            borderBottom: 'none !important',
          },
          '&::before': {
            borderBottom: 'none !important',
          },
        },
        input: {
          height: 12,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: '24px',
          padding: '0 16px',
          display: 'flex',
          alingItems: 'center',
          '&:focus': {
            borderRadius: '50px !important',
            display: 'flex',
            alingItems: 'center',
            justifyContent: 'flex-start',
            width: '90%',
          },
        },
        notchedOutline: {
          borderColor: 'var(--input-bg-color)',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          position: 'relative !important',
          top: '14px !important',
          left: '-2px !important',
          fontSize: '16px !important',
          fontWeight: 700,
          color: 'var(--text-color) !important',
          transform: 'translate(3px, -9px) scale(0.75) !important',
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '&  .Mui-selected': {
            background: 'var(--white-base) !important',
            border: '1px solid var(--primary-color) !important',
            color: 'var(--primary-color) !important',
            fontWeight: 700,
          },
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.06)',
          border: 'none',
          borderRadius: '8px',
          height: 28,
          minHeight: 28,
          minWidth: 28,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 10,
          width: 28,

          '&  .Mui-selected': {
            background: 'var(--white-base)',
            border: '1px solid var(--primary-color) !important',
          },
        },
        icon: {
          fontSize: 16,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: 'auto',
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: 'none',
          '& + &': {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          borderSpacing: 'unset',
          borderRadius: 16,
          borderCollapse: 'separate',
          overflow: 'hidden',
          border: '1px solid var(--table-border)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: 'none',
          fontSize: 14,
          fontWeight: 400,
          fontFamily: 'var(--main-font)',
          borderTop: '1px solid var(--table-border)',
          padding: '15px 16px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          border: 'none',
          [`& .${tableCellClasses.root}`]: {
            border: 'none',
            backgroundColor: 'var(--white-base)',
            color: 'var(--text-color)',
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: 0.5,
          },
          [`& .${tableCellClasses.paddingCheckbox}`]: {
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          height: 65,
          minHeight: '100%',
        },
        head: {
          height: 50,
          minHeight: '100%',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: '0px 10px !important',
          marginTop: '4px !important',
          fontSize: '10px !important',
          '&.Mui-error': {
            color: 'var(--error-color) !important',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        fontWeight: 700,
        color: 'var(--text-color)',
        h1: {
          fontSize: '28px',
        },
        h2: {
          fontSize: '20px',
          lineHeight: '24px',
          marginBottom: '16px',
        },
        h3: {
          fontSize: '20px',
          fontWeight: 700,
          lineHeight: '24px',
          color: 'var(--primary-color)',
        },
        caption: {
          fontSize: '12px',
          fontWeight: 700,
          lineHeight: '30px',
        },
      },
    },
    MuiLoadingButton: {
      defaultProps: {
        loadingPosition: 'end',
      },
      disabled: {
        backgroundColor: 'unset',
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none !important',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 !important',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          marginBottom: 3,
          gap: '10px',
          flexDirection: 'row-reverse',
          minHeight: 'fit-content !important',
          padding: '0 !important',

          '& .Mui-checked': {
            background: 'var(--primary-color) !important',
            color: 'var(--white-base) !important',
            borderColor: 'var(--primary-color) !important',
          },
        },
        expandIconWrapper: {
          position: 'absolute',
          left: '0',
          '& .MuiSvgIcon-root': {
            color: 'var(--primary-color) !important',
          },
        },
        content: {
          margin: '0 !important',
          marginLeft: '34px !important',
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <div></div>,
        checkedIcon: <Check />,
      },
      styleOverrides: {
        root: {
          border: '1px solid #808080',
          borderRadius: 4,
          height: 18,
          width: 18,
          '&.Mui-checked': {
            backgroundColor: 'var(--primary-color)',
          },
          '& .MuiSvgIcon-root': {
            fontSize: 14,
          },
        },
        colorPrimary: {
          color: 'var(--primary-color) !important',
          '&.Mui-checked': {
            color: 'var(--white-base) !important',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 30,
          padding: 10,
        },
      },
    },
    MuiRadio: {
      defaultProps: {
        icon: <div></div>,
        checkedIcon: <Circle />,
      },
      styleOverrides: {
        root: {
          border: '1px solid #808080',
          height: 24,
          width: 24,
          '& .MuiSvgIcon-root': {
            fontSize: 10,
          },
        },
        colorPrimary: {
          color: 'var(--primary-color) !important',
        },
      },
    },
  }
}
