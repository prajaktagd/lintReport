const rangeDiff = (range) => range.end - range.start;
const domainDiff = (domain) => domain.end - domain.start;

const scale = (domain, range, domainValue) => {
  const factor = rangeDiff(range) / domainDiff(domain);
  const newDomainValue = domainValue - domain.start;
  return range.start + factor * newDomainValue;
};

exports.scale = scale;
