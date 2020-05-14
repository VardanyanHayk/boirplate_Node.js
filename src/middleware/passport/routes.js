import passport from 'passport'

export const Auth = passport.authenticate('jwt', { session: false })
// export const partnerAuth = passport.authenticate('partner_jwt', { session: false })
