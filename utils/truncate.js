function truncate(q) {
  let len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

module.exports = { truncate };
