import React from 'react';

const Benifits = () => {
  const benefits = [
    {
      title: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      description: 'Direct income support of ₹6,000 per year to small and marginal farmers.',
      link: 'https://pmkisan.gov.in/',
    },
    {
      title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      description: 'Crop insurance scheme to provide financial support to farmers in case of crop failure.',
      link: 'https://pmfby.gov.in/',
    },
    {
      title: 'Kisan Credit Card (KCC)',
      description: 'Credit facility for farmers to purchase agricultural inputs and meet other expenses.',
      link: 'https://www.kisancreditcard.com/',
    },
    {
      title: 'Soil Health Card Scheme',
      description: 'Scheme to promote soil testing and provide farmers with soil health cards.',
      link: 'https://soilhealth.dac.gov.in/',
    },
    {
      title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      description: 'Scheme to promote organic farming practices among farmers.',
      link: 'https://vikaspedia.in/agriculture/policies-and-schemes/crops-related/paramparagat-krishi-vikas-yojana',
    },
    {
      title: 'National Agriculture Market (e-NAM)',
      description: 'Online trading platform for agricultural commodities to ensure better price realization.',
      link: 'https://www.enam.gov.in/',
    },
    {
      title: 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
      description: 'Scheme to improve farm productivity and ensure better utilization of resources in the irrigation process.',
      link: 'https://pmksy.gov.in/',
    },
    {
      title: 'NABARD Schemes',
      description: 'Various schemes for rural development and agriculture financing by NABARD.',
      link: 'https://www.nabard.org/',
    },
    {
      title: 'Agriculture Infrastructure Fund',
      description: 'A financial support scheme for creating post-harvest management infrastructure.',
      link: 'https://www.agriinfra.dac.gov.in/',
    },
    {
      title: 'Pradhan Mantri Kisan Maandhan Yojana (PMKMY)',
      description: 'Pension scheme for small and marginal farmers in their old age.',
      link: 'https://maandhan.in/',
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.header} >Government Benefits for Farmers</h2>
      <div style={styles.grid}>
        {benefits.map((benefit, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.title}>{benefit.title}</h3>
            <p style={styles.description}>{benefit.description}</p>
            <a href={benefit.link} style={styles.link} target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '10% auto',
    padding: '20px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: 'white',
    fontSize: '32px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#34495e',
  },
  description: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#7f8c8d',
  },
  link: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#2980b9',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  linkHover: {
    backgroundColor: '#3498db',
  },
};

export default Benifits;
