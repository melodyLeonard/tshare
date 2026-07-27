use crossnative::crossnative;

// The transfer core. Hashing every chunk of a multi-gigabyte file is the one
// part of a share that would stall JavaScript for seconds, so it runs here, off
// the JS thread, through react-native-cross-native.

/// Content address of one chunk, as hex. A chunk is identified and later
/// verified by this value, so identical bytes always produce the same address.
#[crossnative]
pub fn hash_chunk(data: &[u8]) -> String {
    blake3::hash(data).to_hex().to_string()
}

/// Fold the ordered chunk hashes into one root that names the whole file. The
/// input is the chunk hashes joined by newlines, in order.
#[crossnative]
pub fn build_root(chunk_hashes: &str) -> String {
    let mut hasher = blake3::Hasher::new();
    for line in chunk_hashes.split('\n').filter(|s| !s.is_empty()) {
        hasher.update(line.as_bytes());
    }
    hasher.finalize().to_hex().to_string()
}

/// Check a received chunk against the hash its manifest promised, before it is
/// written to disk. A mismatch means corruption or tampering.
#[crossnative]
pub fn verify_chunk(data: &[u8], expected: &str) -> bool {
    blake3::hash(data).to_hex().to_string() == expected
}
