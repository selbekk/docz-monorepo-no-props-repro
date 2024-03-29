import React from 'react';
import styled from '@emotion/styled';
import t from 'prop-types';

const scales = {
  small: `
    padding: 5px 10px;
    font-size: 14px;
  `,
  normal: `
    padding: 10px 20px;
    font-size: 16px;
  `,
  big: `
    padding: 20px 30px;
    font-size: 18px;
  `,
};

const kind = (outline: string) => (bg: string, color: string) => {
  const boxShadowColor = outline ? bg : 'transparent';
  const backgroundColor = outline ? 'transparent' : bg;

  return `
    background: ${backgroundColor};
    box-shadow: inset 0 0 0 1px ${boxShadowColor};
    color: ${outline ? bg : color};
    transition: all .3s;

    &:hover {
      box-shadow: inset 0 0 0 1000px ${boxShadowColor};
      color: ${color};
    }
  `;
};
//@ts-ignore
const kinds = outline => {
  const get = kind(outline);

  return {
    primary: get('#1FB6FF', 'white'),
    secondary: get('#5352ED', 'white'),
    cancel: get('#FF4949', 'white'),
    dark: get('#273444', 'white'),
    gray: get('#8492A6', 'white'),
  };
};
//@ts-ignore
const getScale = (({ scale = 'normal' }) => scales[scale]) as any;

const getKind: any = ({ kind = 'primary', outline = false }: any) => {
  //@ts-ignore
  return kinds(outline)[kind];
};

const ButtonStyled = styled.button`
  ${getKind};
  ${getScale};
  cursor: pointer;
  margin: 3px 5px;
  border: none;
  border-radius: 3px;
`;

type ButtonProps = {
  scales?: 'small' | 'normal' | 'big';
  kind?: 'primary' | 'secondary' | 'cancel' | 'dark' | 'gray';
  outline?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ children, ...props }: any) => {
  return <ButtonStyled {...props}>{children}</ButtonStyled>;
};

Button.propTypes = {
  scales: t.oneOf(['small', 'normal', 'big']),
  kind: t.oneOf(['primary', 'secondary', 'cancel', 'dark', 'gray']),
  outline: t.bool,
};

Button.defaultProps = {
  scales: 'normal',
  kind: 'primary',
  outline: false,
};
