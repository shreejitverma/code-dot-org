module Pd::Application
  module ApplicationConstants
    COURSE_NAMES = {
      csd: 'Computer Science Discoveries',
      csp: 'Computer Science Principles',
      csa: 'Computer Science A'
    }.stringify_keys

    YES = 'Yes'.freeze
    NO = 'No'.freeze
    REVIEWING_INCOMPLETE = 'Reviewing Incomplete'.freeze
  end
end
