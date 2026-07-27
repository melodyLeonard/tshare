// Unit tests for the transfer core. Run with `cargo test` from src/native.
use native::{build_root, hash_chunk, verify_chunk};

// A known BLAKE3 digest pins the hash so an accidental algorithm change fails
// loudly rather than silently reshaping every content address.
const HELLO: &str = "d74981efa70a0c880b8d8c1985d075dbcbf679b99a5f9914e5aaf96b831a9e24";

#[test]
fn hashes_bytes_to_known_digest() {
    assert_eq!(hash_chunk(b"hello world"), HELLO);
}

#[test]
fn verify_accepts_matching_and_rejects_altered() {
    assert!(verify_chunk(b"hello world", HELLO));
    assert!(!verify_chunk(b"hello worlx", HELLO));
}

#[test]
fn root_is_order_sensitive_and_stable() {
    let a = build_root("h1\nh2\nh3");
    assert_eq!(a, build_root("h1\nh2\nh3"));
    assert_ne!(a, build_root("h2\nh1\nh3"));
}
