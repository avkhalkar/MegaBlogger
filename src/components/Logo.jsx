function Logo({ width = '100px' }) {
  return (
    <div
      style={{ width }}
      className={`font-bold text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent flex-shrink-0`}
    >
      MB
    </div>
  )
}

export default Logo