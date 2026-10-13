import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// ═══════════════════════════════════════════════════════════════════════════════
//  USER SCHEMA  —  extend at the bottom for app-specific fields
// ═══════════════════════════════════════════════════════════════════════════════
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,          // never returned in queries by default
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: '',
    },
    resetPasswordToken:   String,
    resetPasswordExpires: Date,

    // ─────────────────────────────────────────────────────────────────────────
    //  ✏️  ADD YOUR APP-SPECIFIC FIELDS BELOW THIS LINE
    //  Example:
    //    phone:   { type: String },
    //    address: { type: String },
    //    plan:    { type: String, enum: ['free', 'pro'], default: 'free' },
    // ─────────────────────────────────────────────────────────────────────────
  },
  { timestamps: true }
);

// ─── Hash password before save ────────────────────────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ─── Instance method: compare passwords ───────────────────────────────────────
userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

// ─── Sanitize output (remove sensitive fields from toJSON) ────────────────────
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.resetPasswordToken;
  delete obj.resetPasswordExpires;
  delete obj.__v;
  return obj;
};

const User = mongoose.model('User', userSchema);
export default User;
