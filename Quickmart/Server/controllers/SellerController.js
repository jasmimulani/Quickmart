import jwt from 'jsonwebtoken';

//  login seller (supports up to 3 admins via env vars)

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const inputEmail = String(email || '').trim().toLowerCase();
    const inputPassword = String(password || '').trim();

    // Build allowed admins list from env (backward-compatible with single SELLER_EMAIL/PASSWORD)
    const admins = [];
    if (process.env.SELLER_EMAIL && process.env.SELLER_PASSWORD) {
      admins.push({ key: 'default', email: String(process.env.SELLER_EMAIL).trim().toLowerCase(), password: String(process.env.SELLER_PASSWORD).trim(), name: process.env.SELLER_NAME || 'Admin' });
    }
    for (let i = 1; i <= 3; i++) {
      const e = process.env[`SELLER_${i}_EMAIL`];
      const p = process.env[`SELLER_${i}_PASSWORD`];
      const n = process.env[`SELLER_${i}_NAME`];
      if (e && p) admins.push({ key: String(i), email: String(e).trim().toLowerCase(), password: String(p).trim(), name: n || `Admin ${i}` });
    }

    // Debug: log which admin emails were loaded and the email attempting to login
    try {
      const loadedEmails = admins.map(a => a.email);
      console.log('[sellerLogin] loaded admin emails:', loadedEmails);
      console.log('[sellerLogin] incoming email:', inputEmail);
    } catch {}

    const matched = admins.find((a) => a.email === inputEmail && a.password === inputPassword);

    if (!matched) {
      return res.json({ success: false, message: 'invalid Credintials' });
    }

    const profile = { role: 'admin', email: matched.email, name: matched.name, key: matched.key };
    const token = jwt.sign(profile, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('sellerToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: 'logged in', profile });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  seller is auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true, profile: req.admin });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//  logout seller
export const sellerlogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: 'logged Out.' });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};