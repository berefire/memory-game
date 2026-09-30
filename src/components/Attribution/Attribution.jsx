function Attribution({colorText="text-grey-50", colorLink="text-blue-100"}) {
  return (
    <footer className={`${colorText} font-body text-center text-xs`}>
      Challenge by{' '}
      <a
        href="https://www.frontendmentor.io?ref=challenge"
        className={`${colorLink} hover:underline focus-visible:focus-ring`}
      >
        Frontend Mentor <span
          aria-hidden="true" className="external-icon">🔗</span>
      </a>
      . Coded by{' '}
      <a
        href="https://github.com/berefire"
        className={`${colorLink} hover:underline focus-visible:focus-ring`}
      >
        Berefire
      </a>
      .
    </footer>
  );
}

export default Attribution;