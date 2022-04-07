name: Pull Request
description: Create a pull request
title: "type: summary"
body:
  - type: input
    id: issue
    attributes:
      label: Related ISSUE
      description: Which package are you reporting
      value: link /#
      placeholder: input follow ISSUE number

  - type: checkboxes
    id: types
    attributes:
      label: Type of change
      description: Please choose options that are type relevant.
      options:
        - label: Bug fix (non-breaking change which fixes an issue)
        - label: New feature (non-breaking change which adds functionality)
        - label: Document (This change requires a documentation update)
        - label: Theme style (Theme style beautification)
        - label: Workflow (Workflow changes)
      validations:
        required: true

  - type: textarea
    id: description
    attributes:
      label: Description
      description: Please include a summary of the changes. Please also include relevant motivation and context. List any dependencies that are required for this change.
      placeholder: input description
    validations:
      required: true

  - type: textarea
    id: testcase
    attributes:
      label: Test Case
      description: Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce. Please also list any relevant details for your test case.
      placeholder: Please describe the tests