import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { reviewsData } from '../../data/content';
import { Section, SectionTitle, SectionSubtitle, Container } from '../common/Section';

const Reviews = () => {
  return (
    <Section id="reviews" className="bg-gray-50 py-20">
      <Container>
        <SectionTitle>Student Reviews</SectionTitle>
        <SectionSubtitle>
          See what our students have to say about their learning experience.
        </SectionSubtitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsData.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <FaQuoteLeft className="text-3xl text-primary-300" />
              </div>
              <p className="text-gray-700 mb-4 text-center italic">"{review.text}"</p>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-500 text-center font-medium">— {review.author}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Reviews;
