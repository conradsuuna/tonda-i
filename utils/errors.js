/**
 * Wrap around controllers to avoid try catch blocks
 * @param {function} fn
 * @returns {function} next
 */
export const catchErrors = (fn) => (req, res, next) => fn(req, res, next).catch(next);
