import React from 'react';
import Router from 'next/router';

import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

// const login = '/login?redirected=true'; 
const login = '/'

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */
const checkUserAuthentication = (context) => {
    try {
        //Aqui eu pego qual é o token do usuário que está nos cookies 
        //e descubro, a partir do token, quem é o usuário
        if (!context?.req?.headers) {
          return {
            auth: true
          }
        }

        const token = context.req.headers.cookie.split('token=')[1];
        const user: User = jwt.decode(token) as User;

        console.log(user);

        if (!user) {
            return { auth: null }
        }

        //Aqui eu faco a verificacao de permissionamento
        const route = context.pathname.split('/')[1];

        if(route === 'admin' && user.perfil != 'Admin') {
            return { 
                auth: null,
                ...user,
            }
        }

        return { auth: true, ...user }; // change null to { isAdmin: true } for test it.
    } catch(e) {
        console.log('Erro:', e);
        return { auth: null }
    }
};

export default WrappedComponent => {
  try {
    const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

    hocComponent.getInitialProps = async (context) => {
      const userAuth = await checkUserAuthentication(context);

      // Are you an authorized user or not?
      if (!userAuth?.auth) {
        // Handle server-side and client-side rendering.
        if (context.res) {
          context.res?.writeHead(302, {
            Location: login,
          });
          context.res?.end();
        } else {
          Router.replace(login);
        }
      } else if (WrappedComponent.getInitialProps) {
        console.log('w')
        const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
        return { ...wrappedProps, userAuth };
      }

      return { userAuth };
    };

    return hocComponent;
  } catch(e) {
    console.log('Erro WrappedComponent:', e);
    return e;
  }
};