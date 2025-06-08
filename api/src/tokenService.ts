import crypto from 'crypto';

// The master token is stored server-side
const MASTER_TOKEN = "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";

// Store temporary tokens with their expiration
interface TempToken {
  token: string;
  expiresAt: number;
}

class TokenService {
  private static tempTokens: Map<string, TempToken> = new Map();
  
  // Clean up expired tokens every hour
  static {
    setInterval(() => {
      const now = Date.now();
      for (const [id, token] of TokenService.tempTokens) {
        if (token.expiresAt < now) {
          TokenService.tempTokens.delete(id);
        }
      }
    }, 1000 * 60 * 60); // Every hour
  }

  static generateTemporaryToken(): { tempToken: string, expiresIn: number } {
    // Generate a random token ID
    const tokenId = crypto.randomBytes(16).toString('hex');
    
    // Token expires in 24 hours
    const expiresAt = Date.now() + 1000 * 60 * 60 * 24;
    
    TokenService.tempTokens.set(tokenId, {
      token: MASTER_TOKEN,
      expiresAt
    });

    return {
      tempToken: tokenId,
      expiresIn: 24 * 60 * 60 // 24 hours in seconds
    };
  }

  static getMasterToken(tempToken: string): string | null {
    const tokenData = TokenService.tempTokens.get(tempToken);
    if (!tokenData || tokenData.expiresAt < Date.now()) {
      return null;
    }
    return tokenData.token;
  }
}

export default TokenService; 